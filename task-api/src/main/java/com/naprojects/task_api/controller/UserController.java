package com.naprojects.task_api.controller;

import com.naprojects.task_api.dto.UpdateUserDto;
import com.naprojects.task_api.dto.UserResponseDto;
import com.naprojects.task_api.dto.UserSummaryDto;
import com.naprojects.task_api.response.ApiResponse;
import com.naprojects.task_api.service.user.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping
    ResponseEntity<ApiResponse> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails){
        UserResponseDto user = userService.getCurrentUser(userDetails);
        return ResponseEntity.ok(new ApiResponse("current user.",user));
    }

    @GetMapping("/summary")
    ResponseEntity<ApiResponse> getUserSummary(@AuthenticationPrincipal UserDetails userDetails){
        UserSummaryDto user = userService.getUserSummary(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse("cuser summary.",user));
    }

    @PutMapping
    ResponseEntity<ApiResponse> updateUser(@Valid @RequestBody UpdateUserDto updateUserDto, @AuthenticationPrincipal UserDetails userDetails){
        UserResponseDto user = userService.updateUser(updateUserDto,userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse("current user.",user));
    }
}
