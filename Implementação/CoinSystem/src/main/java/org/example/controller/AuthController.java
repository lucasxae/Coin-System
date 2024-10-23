package org.example.controller;

import org.example.model.AuthRequest;
import org.example.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        public ResponseEntity login(@RequestBody AuthRequest authRequest) {
            if(authService.login(authRequest.getLogin(), authRequest.getSenha()).equals("Login bem-sucedido como Aluno!")||
            authService.login(authRequest.getLogin(), authRequest.getSenha()).equals("Login bem-sucedido como Professor!")){
                return ResponseEntity.ok().build();

            }return ResponseEntity.badRequest().build();
            
        }

}
