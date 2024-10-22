package org.example.controller;


import java.util.List;

import org.example.model.Professor;
import org.example.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Professor")
public class ProfessorController{

    @Autowired
    ProfessorService professorService;

    @GetMapping
    public List<Professor> findAll(){
        return this.professorService.findAll();
    }

    @GetMapping("/{login}")
    public ResponseEntity<Professor> findByLogin(@PathVariable String login){
        Professor Professor= this.professorService.findByLogin(login);
        if(Professor!=null){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<Professor> create(@RequestBody Professor newProfessor){
        try {
            this.professorService.createProfessor(newProfessor);
            return ResponseEntity.ok().body(newProfessor);
           } catch (Exception e) {
            return ResponseEntity.badRequest().build();
           }
    }
    @PutMapping("/{cpf}")
    public ResponseEntity<Professor> update(@PathVariable String cpf, @RequestBody Professor newProfessor){
        try {
            this.professorService.updateProfessor(cpf, newProfessor);
            return ResponseEntity.ok(newProfessor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    
    }
    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> removeProfessor(@PathVariable String cpf){
        this.professorService.deleteByCpf(cpf);
        return ResponseEntity.noContent().build();
    }
    }