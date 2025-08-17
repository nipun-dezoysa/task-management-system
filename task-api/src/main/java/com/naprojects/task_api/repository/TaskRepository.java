package com.naprojects.task_api.repository;

import com.naprojects.task_api.enums.TaskStatus;
import com.naprojects.task_api.model.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity,Long> {
    List<TaskEntity> findByUserEntityEmail(String email);
    List<TaskEntity> findByUserEntityIdAndStatus(Long userId, TaskStatus status);
    List<TaskEntity> findByDeadlineBetweenAndStatusNot(
            LocalDateTime start,
            LocalDateTime end,
            TaskStatus status
    );
}
