package com.naprojects.task_api.security.user;

import com.naprojects.task_api.model.UserEntity;
import com.naprojects.task_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(()-> new UsernameNotFoundException("User not found!"));
        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword()) // already encoded
                .roles(user.getRole().replace("ROLE_", "")) // Spring adds ROLE_ automatically
                .build();
    }
}
