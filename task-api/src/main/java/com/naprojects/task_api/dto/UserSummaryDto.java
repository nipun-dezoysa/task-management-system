package com.naprojects.task_api.dto;

import lombok.Data;

@Data
public class UserSummaryDto {
    private int total;
    private int completed;
    private int progress;
    private int todo;
}
