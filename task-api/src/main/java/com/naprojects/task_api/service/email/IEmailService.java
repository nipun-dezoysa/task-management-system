package com.naprojects.task_api.service.email;

public interface IEmailService {
    void sendPasswordResetEmail(String email, String token);
}
