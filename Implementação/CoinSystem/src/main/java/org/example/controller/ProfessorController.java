package org.example.controller;

import java.util.List;

import org.example.model.EnviarMoedas;
import org.example.model.Extrato;
import org.example.model.Professor;
import org.example.repository.ProfessorRepository;
import org.example.service.EnvioMoedasService;
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
public class ProfessorController {

    @Autowired
    ProfessorService professorService;

    @Autowired
    ProfessorRepository professorRepository;

    @Autowired
    EnvioMoedasService extratoService;

    @GetMapping
    public List<Professor> findAll() {
        return this.professorService.findAll();
    }

    @GetMapping("/{login}")
    public ResponseEntity<Professor> findByLogin(@PathVariable String login) {
        Professor Professor = this.professorService.findByLogin(login);
        if (Professor != null) {
            return ResponseEntity.ok().body(Professor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Professor> create(@RequestBody Professor newProfessor) {
        try {
            this.professorService.createProfessor(newProfessor);
            return ResponseEntity.ok().body(newProfessor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{login}")
    public ResponseEntity<Professor> update(@PathVariable String login, @RequestBody Professor newProfessor) {
        try {
            this.professorService.updateProfessor(login, newProfessor);
            return ResponseEntity.ok(newProfessor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{login}")
    public ResponseEntity<Void> removeProfessor(@PathVariable String login) {
        this.professorService.deleteByLogin(login);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{login}/extrato")
    public ResponseEntity<String> getExtrato(@PathVariable String login) {
        return professorRepository.findById(login)
                .map(professor -> ResponseEntity.ok("Quantidade de moedas (créditos): " + professor.getCreditos()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/enviarMoedas")
    public Extrato enviarMoedas(@RequestBody EnviarMoedas enviarMoedas) {
        return extratoService.enviaMoedas(enviarMoedas.getLoginAluno(), enviarMoedas.getLoginProfessor(),
                enviarMoedas.getQuantidadeMoedas());
    }

}
