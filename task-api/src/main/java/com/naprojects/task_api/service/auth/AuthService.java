package com.naprojects.task_api.service.auth;
import com.naprojects.task_api.dto.*;
import com.naprojects.task_api.exception.AlreadyExistsException;
import com.naprojects.task_api.exception.ExpiredTokenException;
import com.naprojects.task_api.exception.InvalidTokenException;
import com.naprojects.task_api.exception.NotFoundException;
import com.naprojects.task_api.model.ResetTokenEntity;
import com.naprojects.task_api.model.UserEntity;
import com.naprojects.task_api.repository.ResetTokenRepository;
import com.naprojects.task_api.repository.UserRepository;
import com.naprojects.task_api.response.ApiResponse;
import com.naprojects.task_api.security.jwt.JwtUtils;
import org.modelmapper.ModelMapper;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final ResetTokenRepository resetTokenRepository;
    private final JavaMailSender mailSender;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse register(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new AlreadyExistsException("Email is already taken!");
        }

        UserEntity user = new UserEntity(
                registerDto.getFname(),
                registerDto.getLname(),
                registerDto.getEmail(),
                passwordEncoder.encode(registerDto.getPassword())
        );

        userRepository.save(user);
        return new ApiResponse("Registered successfully.", null);
    }

    @Override
    public ApiResponse login(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails.getUsername());
            UserEntity user = userRepository.findByEmail(loginDto.getEmail())
                    .orElseThrow(() -> new NotFoundException("User not found with email: " + loginDto.getEmail()));

            return new ApiResponse("Login successfully.", new LoginResponseDto(token,modelMapper.map(user,UserResponseDto.class)));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    @Override
    @Transactional
    public ApiResponse forgotPassword(ForgotPasswordDto forgotPasswordDto){
        UserEntity user = userRepository.findByEmail(forgotPasswordDto.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found with email: " + forgotPasswordDto.getEmail()));
        String reset = UUID.randomUUID().toString();
        if(resetTokenRepository.existsByUser(user)){
            resetTokenRepository.deleteByUser(user);
            resetTokenRepository.flush();
        }
        ResetTokenEntity token = new ResetTokenEntity(reset,user);
        resetTokenRepository.save(token);
        sendPasswordResetEmail(user.getEmail(), reset);
        return new ApiResponse("token generated",null);
    }

    @Override
    public ApiResponse resetPassword(ResetPasswordDto resetPasswordDto){
        UserEntity user = userRepository.findByEmail(resetPasswordDto.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found with email: " + resetPasswordDto.getEmail()));
        ResetTokenEntity token =  resetTokenRepository.findByUserAndToken(user,resetPasswordDto.getToken())
                .orElseThrow(() -> new InvalidTokenException("Invalid Token"));

        if(token.isExpired()){
            throw new ExpiredTokenException("token is expired");
        }

        user.setPassword(passwordEncoder.encode(resetPasswordDto.getNewPassword()));
        userRepository.save(user);
        return new ApiResponse("Password reset successfully",null);
    }

    @Override
    public ApiResponse getTokenDetails(String resetToken){
        ResetTokenEntity token = resetTokenRepository.findByToken(resetToken)
                .orElseThrow(() -> new InvalidTokenException("Invalid Token"));
        if(token.isExpired()){
            throw new ExpiredTokenException("token is expired");
        }
        return new ApiResponse("reset token",token.getUser().getEmail());
    }

    private void sendPasswordResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n\n"
                + "http://localhost:5173/" + token);
        mailSender.send(message);
    }
}
