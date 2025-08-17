package com.naprojects.task_api.service.user;

import com.naprojects.task_api.dto.UpdateUserDto;
import com.naprojects.task_api.dto.UserResponseDto;
import com.naprojects.task_api.dto.UserSummaryDto;
import com.naprojects.task_api.enums.TaskStatus;
import com.naprojects.task_api.exception.NotFoundException;
import com.naprojects.task_api.model.TaskEntity;
import com.naprojects.task_api.model.UserEntity;
import com.naprojects.task_api.repository.TaskRepository;
import com.naprojects.task_api.repository.UserRepository;
import com.naprojects.task_api.security.user.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final TaskRepository taskRepository;

    @Override
    public UserResponseDto getCurrentUser(UserDetails userDetails){
        UserEntity user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found with email: " + userDetails.getUsername()));
        return modelMapper.map(user,UserResponseDto.class);
    }

    @Override
    public UserResponseDto updateUser(UpdateUserDto updateUserDto, String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found with email: " + email));
        user.setFirstName(updateUserDto.getFirstName());
        user.setLastName(updateUserDto.getLastName());
        user.setEmail(updateUserDto.getEmail());
        userRepository.save(user);
        return modelMapper.map(user,UserResponseDto.class);
    }

    @Override
    public UserSummaryDto getUserSummary(String email) {
        List<TaskEntity> tasks = taskRepository.findByUserEntityEmail(email);

        UserSummaryDto summary = new UserSummaryDto();
        summary.setTotal(tasks.size());
        summary.setCompleted((int) tasks.stream().filter(t -> t.getStatus() == TaskStatus.COMPLETED).count());
        summary.setProgress((int) tasks.stream().filter(t -> t.getStatus() == TaskStatus.IN_PROGRESS).count());
        summary.setTodo((int) tasks.stream().filter(t -> t.getStatus() == TaskStatus.PENDING).count());

        return summary;
    }

}
