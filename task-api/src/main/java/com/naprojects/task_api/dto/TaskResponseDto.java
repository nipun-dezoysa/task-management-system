package com.naprojects.task_api.dto;

import com.naprojects.task_api.enums.TaskStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private Long userId;
    private TaskStatus status;
    private LocalDateTime createdDate;
    private LocalDateTime deadline;
}