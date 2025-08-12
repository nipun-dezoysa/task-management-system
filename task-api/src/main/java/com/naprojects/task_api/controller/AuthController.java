package com.naprojects.task_api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}")
public class AuthController {

    @GetMapping()
    public ResponseEntity<String> hello(){
        return  ResponseEntity.ok("hello world");
    }

}
