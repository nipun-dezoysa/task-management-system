package com.naprojects.task_api.service.auth;

import com.naprojects.task_api.dto.*;
import com.naprojects.task_api.response.ApiResponse;

public interface IAuthService {
    ApiResponse register(RegisterDto registerDto);
    ApiResponse login(LoginDto loginDto);
    ApiResponse forgotPassword(ForgotPasswordDto forgotPasswordDto);
    ApiResponse resetPassword(ResetPasswordDto resetPasswordDto);
    ApiResponse changePassword(ChangePasswordDto changePasswordDto, String email);
    ApiResponse getTokenDetails(String resetToken);
}
