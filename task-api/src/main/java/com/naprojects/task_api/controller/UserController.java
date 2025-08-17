package com.naprojects.task_api.controller;

import com.naprojects.task_api.dto.UserResponseDto;
import com.naprojects.task_api.response.ApiResponse;
import com.naprojects.task_api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    ResponseEntity<ApiResponse> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails){
        UserResponseDto user = userService.getCurrentUser(userDetails);
        return ResponseEntity.ok(new ApiResponse("current user.",user));
    }
}
