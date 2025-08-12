package com.naprojects.task_api.repository;

import com.naprojects.task_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
