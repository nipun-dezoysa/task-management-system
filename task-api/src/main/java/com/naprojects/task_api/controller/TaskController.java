package com.naprojects.task_api.controller;

import com.naprojects.task_api.dto.CreateTaskDto;
import com.naprojects.task_api.dto.TaskResponseDto;
import com.naprojects.task_api.dto.UpdateTaskDto;
import com.naprojects.task_api.response.ApiResponse;
import com.naprojects.task_api.service.task.ITaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final ITaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse> createTask(@Valid @RequestBody CreateTaskDto createTaskDto,@AuthenticationPrincipal UserDetails userDetails) {
        TaskResponseDto createdTask = taskService.createTask(createTaskDto,userDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("Task successfully created.",createdTask));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getCurrentUserTasks(@AuthenticationPrincipal UserDetails userDetails) {
        List<TaskResponseDto> tasks = taskService.getCurrentUserTasks(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse("User Tasks",tasks));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse> getCurrentUserTodayTasks(@AuthenticationPrincipal UserDetails userDetails) {
        List<TaskResponseDto> tasks = taskService.getCurrentUserTodayTasks(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse("User Tasks",tasks));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskDto updateTaskDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        TaskResponseDto updatedTask = taskService.updateTask(id, updateTaskDto,userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse("Task updated.",updatedTask));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        taskService.deleteTask(id,userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse("Task deleted.",null));
    }
}