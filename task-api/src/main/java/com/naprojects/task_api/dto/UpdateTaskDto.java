package com.naprojects.task_api.dto;

import com.naprojects.task_api.enums.TaskStatus;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateTaskDto {
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @Future(message = "Deadline must be in the future")
    private LocalDateTime deadline;

    private TaskStatus status;
}