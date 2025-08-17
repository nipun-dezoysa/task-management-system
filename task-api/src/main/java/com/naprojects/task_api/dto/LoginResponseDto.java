package com.naprojects.task_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    private  String accessToken;
    private UserResponseDto user;
}
