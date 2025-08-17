package com.naprojects.task_api.controller;

import com.naprojects.task_api.dto.*;
import com.naprojects.task_api.response.ApiResponse;
import com.naprojects.task_api.service.auth.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}")
public class AuthController {

    private final IAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginDto loginDto) {
        ApiResponse response = authService.login(loginDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        ApiResponse response = authService.register(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@Valid @RequestBody ForgotPasswordDto forgotPasswordDto) {
        ApiResponse response = authService.forgotPassword(forgotPasswordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordDto resetPasswordDto) {
        ApiResponse response = authService.resetPassword(resetPasswordDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto, @AuthenticationPrincipal UserDetails userDetails) {
        ApiResponse response = authService.changePassword(changePasswordDto, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/reset-token/{id}")
    public ResponseEntity<ApiResponse> getResetTokenDetails(@PathVariable("id") String token) {
        ApiResponse response = authService.getTokenDetails(token);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
