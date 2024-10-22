package org.example.controller;

import java.util.List;

import org.example.model.Aluno;
import org.example.service.AlunoService;
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
@RequestMapping("/Alunos")
public class AlunoController{

    @Autowired
    AlunoService alunoService;

    @GetMapping
    public List<Aluno> findAll(){
        return this.alunoService.getAll();
    }

    @GetMapping("/{login}")
    public ResponseEntity<Aluno> findByLogin(@PathVariable String login){
        Aluno aluno= this.alunoService.getAlunoByLogin(login);
        if(aluno!=null){
            return ResponseEntity.ok().body(aluno);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/register")
    public ResponseEntity<Aluno> create(@RequestBody Aluno newAluno){
        try {
            this.alunoService.createAluno(newAluno);
            return ResponseEntity.ok().body(newAluno);
           } catch (Exception e) {
            return ResponseEntity.badRequest().build();
           }
    }
    @PutMapping("/{cpf}")
    public ResponseEntity<Aluno> update(@PathVariable String cpf, @RequestBody Aluno newAluno){
        try {
            this.alunoService.updateAluno(newAluno,cpf);
            return ResponseEntity.ok(newAluno);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    
    }
    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> removeAluno(@PathVariable String cpf){
        this.alunoService.deleteAluno(cpf);
        return ResponseEntity.noContent().build();
    }
    }

