package com.naprojects.task_api.controller;

import com.naprojects.task_api.dto.ForgotPasswordDto;
import com.naprojects.task_api.dto.LoginDto;
import com.naprojects.task_api.dto.RegisterDto;
import com.naprojects.task_api.dto.ResetPasswordDto;
import com.naprojects.task_api.response.ApiResponse;
import com.naprojects.task_api.service.auth.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/reset-token/{id}")
    public ResponseEntity<ApiResponse> getResetTokenDetails(@PathVariable("id") String token) {
        ApiResponse response = authService.getTokenDetails(token);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
