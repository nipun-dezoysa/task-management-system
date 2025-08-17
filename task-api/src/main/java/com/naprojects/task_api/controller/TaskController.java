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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final ITaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse> createTask(@Valid @RequestBody CreateTaskDto createTaskDto) {
        TaskResponseDto createdTask = taskService.createTask(createTaskDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("Task successfully created.",createdTask));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getTasksByUserId(@PathVariable Long userId) {
        List<TaskResponseDto> tasks = taskService.getTasksByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("User Tasks",tasks));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskDto updateTaskDto) {
        TaskResponseDto updatedTask = taskService.updateTask(id, updateTaskDto);
        return ResponseEntity.ok(new ApiResponse("Task updated.",updatedTask));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(new ApiResponse("Task deleted.",null));
    }
}