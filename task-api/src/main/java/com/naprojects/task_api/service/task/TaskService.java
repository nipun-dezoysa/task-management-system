package com.naprojects.task_api.service.task;

import com.naprojects.task_api.dto.CreateTaskDto;
import com.naprojects.task_api.dto.TaskResponseDto;
import com.naprojects.task_api.dto.UpdateTaskDto;
import com.naprojects.task_api.exception.NotFoundException;
import com.naprojects.task_api.model.TaskEntity;
import com.naprojects.task_api.model.UserEntity;
import com.naprojects.task_api.repository.TaskRepository;
import com.naprojects.task_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService implements ITaskService{
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public TaskResponseDto createTask(CreateTaskDto createTaskDto, UserDetails userDetails) {
        UserEntity user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found with email: " + userDetails.getUsername()));

        TaskEntity task = modelMapper.map(createTaskDto, TaskEntity.class);
        task.setUserEntity(user);
        task.setCreatedDate(LocalDateTime.now());

        TaskEntity savedTask = taskRepository.save(task);
        return modelMapper.map(savedTask, TaskResponseDto.class);
    }

    @Override
    public List<TaskResponseDto> getTasksByUserId(Long userId) {
        return taskRepository.findByUserEntityId(userId).stream()
                .map(task -> modelMapper.map(task, TaskResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TaskResponseDto updateTask(Long id, UpdateTaskDto updateTaskDto) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task not found with id: " + id));

        if (updateTaskDto.getTitle() != null) {
            task.setTitle(updateTaskDto.getTitle());
        }
        if (updateTaskDto.getDescription() != null) {
            task.setDescription(updateTaskDto.getDescription());
        }
        if (updateTaskDto.getDeadline() != null) {
            task.setDeadline(updateTaskDto.getDeadline());
        }
        if (updateTaskDto.getStatus() != null) {
            task.setStatus(updateTaskDto.getStatus());
        }

        TaskEntity updatedTask = taskRepository.save(task);
        return modelMapper.map(updatedTask, TaskResponseDto.class);
    }

    @Override
    @Transactional
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new NotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
}
