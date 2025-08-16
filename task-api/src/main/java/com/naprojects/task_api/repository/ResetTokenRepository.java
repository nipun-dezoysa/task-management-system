package com.naprojects.task_api.repository;

import com.naprojects.task_api.model.ResetTokenEntity;
import com.naprojects.task_api.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResetTokenRepository extends JpaRepository<ResetTokenEntity, Long> {
    boolean existsByUser(UserEntity user);
    void deleteByUser(UserEntity user);
    Optional<ResetTokenEntity> findByUserAndToken(UserEntity user,String token);
}