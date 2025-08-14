package com.naprojects.task_api.service.task;

import com.naprojects.task_api.dto.CreateTaskDto;
import com.naprojects.task_api.dto.TaskResponseDto;
import com.naprojects.task_api.dto.UpdateTaskDto;

import java.util.List;

public interface ITaskService {
    TaskResponseDto createTask(CreateTaskDto createTaskDto);
    List<TaskResponseDto> getTasksByUserId(Long userId);
    TaskResponseDto updateTask(Long id, UpdateTaskDto updateTaskDto);
    void deleteTask(Long id);
}
