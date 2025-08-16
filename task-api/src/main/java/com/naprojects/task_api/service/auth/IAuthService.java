package com.naprojects.task_api.service.auth;

import com.naprojects.task_api.dto.ForgotPasswordDto;
import com.naprojects.task_api.dto.LoginDto;
import com.naprojects.task_api.dto.RegisterDto;
import com.naprojects.task_api.dto.ResetPasswordDto;
import com.naprojects.task_api.response.ApiResponse;

public interface IAuthService {
    ApiResponse register(RegisterDto registerDto);
    ApiResponse login(LoginDto loginDto);
    ApiResponse forgotPassword(ForgotPasswordDto forgotPasswordDto);
    ApiResponse resetPassword(ResetPasswordDto resetPasswordDto);
}
