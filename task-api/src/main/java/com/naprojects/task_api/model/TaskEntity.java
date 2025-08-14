package com.naprojects.task_api.model;

import com.naprojects.task_api.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.PENDING;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private LocalDateTime deadline;

    public TaskEntity(String title, String description, UserEntity userEntity, LocalDateTime deadline) {
        this.title = title;
        this.description = description;
        this.userEntity = userEntity;
        this.deadline = deadline;
    }
}
