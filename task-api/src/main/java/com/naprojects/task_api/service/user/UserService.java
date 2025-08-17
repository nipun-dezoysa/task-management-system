package com.naprojects.task_api.service.user;

import com.naprojects.task_api.dto.UserResponseDto;
import com.naprojects.task_api.exception.NotFoundException;
import com.naprojects.task_api.model.UserEntity;
import com.naprojects.task_api.repository.UserRepository;
import com.naprojects.task_api.security.user.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserResponseDto getCurrentUser(UserDetails userDetails){
        UserEntity user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userDetails.getUsername()));
        return modelMapper.map(user,UserResponseDto.class);
    }
}
