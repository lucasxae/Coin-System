package org.example.controller;

import org.example.model.AuthRequest;
import org.example.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    public AuthService authService;
    
@PostMapping("/login")
        public String login(@RequestBody AuthRequest authRequest) {
            return authService.login(authRequest.getLogin(), authRequest.getSenha());
        }

}
