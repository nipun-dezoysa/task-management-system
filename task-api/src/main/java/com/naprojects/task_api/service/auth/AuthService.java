package com.naprojects.task_api.service.auth;
import com.naprojects.task_api.dto.ForgotPasswordDto;
import com.naprojects.task_api.dto.LoginDto;
import com.naprojects.task_api.dto.RegisterDto;
import com.naprojects.task_api.dto.ResetPasswordDto;
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

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final ResetTokenRepository resetTokenRepository;
    private final JavaMailSender mailSender;

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
            return new ApiResponse("Login successfully.", token);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    @Override
    @Transactional
    public ApiResponse forgotPassword(ForgotPasswordDto forgotPasswordDto){
        UserEntity user = userRepository.findByEmail(forgotPasswordDto.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found with email: " + forgotPasswordDto.getEmail()));
        Random random = new Random();
        String reset = String.format("%04d", random.nextInt(10000));
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

    private void sendPasswordResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("token: " + token);
        mailSender.send(message);
    }
}
