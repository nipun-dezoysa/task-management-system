package com.naprojects.task_api.repository;

import com.naprojects.task_api.model.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity,Long> {
    List<TaskEntity> findByUserEntityEmail(String email);

    @Query("SELECT t FROM TaskEntity t WHERE t.userEntity.email = :email " +
            "AND DATE(t.deadline) = CURRENT_DATE")
    List<TaskEntity> findTodayTasksByUserEmail(@Param("email") String email);
}
