package com.naprojects.task_api.service.user;

import com.naprojects.task_api.dto.UpdateUserDto;
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

}
