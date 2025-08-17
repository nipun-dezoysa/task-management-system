package com.naprojects.task_api.service.task;

import com.naprojects.task_api.dto.CreateTaskDto;
import com.naprojects.task_api.dto.TaskResponseDto;
import com.naprojects.task_api.dto.UpdateTaskDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ITaskService {
    TaskResponseDto createTask(CreateTaskDto createTaskDto, UserDetails userDetails);
    List<TaskResponseDto> getCurrentUserTasks(String email);
    TaskResponseDto updateTask(Long id, UpdateTaskDto updateTaskDto, String email);
    void deleteTask(Long id,String email);
}
