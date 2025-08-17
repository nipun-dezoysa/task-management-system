package com.naprojects.task_api.service.user;

import com.naprojects.task_api.dto.UpdateUserDto;
import com.naprojects.task_api.dto.UserResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface IUserService {
    UserResponseDto getCurrentUser(UserDetails userDetails);
    UserResponseDto updateUser(UpdateUserDto updateUserDto, String email);
}
