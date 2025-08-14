package com.naprojects.task_api.repository;

import com.naprojects.task_api.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    boolean existsByEmail(String email);
    UserEntity findByEmail(String email);
}
