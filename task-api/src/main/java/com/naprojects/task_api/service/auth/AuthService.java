package com.naprojects.task_api.service.auth;
import com.naprojects.task_api.dto.LoginDto;
import com.naprojects.task_api.dto.RegisterDto;
import com.naprojects.task_api.exception.AlreadyExistsException;
import com.naprojects.task_api.model.UserEntity;
import com.naprojects.task_api.repository.UserRepository;
import com.naprojects.task_api.response.ApiResponse;
import com.naprojects.task_api.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

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
}
