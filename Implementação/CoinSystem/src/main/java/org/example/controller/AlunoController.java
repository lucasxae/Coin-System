package org.example.controller;

import java.util.List;

import org.example.model.Aluno;
import org.example.model.Vantagens;
import org.example.repository.AlunoRepository;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Alunos")
public class AlunoController {

    @Autowired
    AlunoService alunoService;

    @Autowired
    AlunoRepository alunoRepository;

    @GetMapping
    public List<Aluno> findAll() {
        return this.alunoService.getAll();
    }

    @GetMapping("/{login}")
    public ResponseEntity<Aluno> findByLogin(@PathVariable String login) {
        Aluno aluno = this.alunoService.getAlunoByLogin(login);
        if (aluno != null) {
            return ResponseEntity.ok().body(aluno);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Aluno> create(@RequestBody Aluno newAluno) {
        try {
            this.alunoService.createAluno(newAluno);
            return ResponseEntity.ok().body(newAluno);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{login}")
    public ResponseEntity<Aluno> update(@PathVariable String login, @RequestBody Aluno newAluno) {
        try {
            this.alunoService.updateAluno(newAluno, login);
            return ResponseEntity.ok(newAluno);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{login}")
    public ResponseEntity<Void> removeAluno(@PathVariable String login) {
        this.alunoService.deleteAluno(login);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{login}/extrato")
    public ResponseEntity<String> getExtrato(@PathVariable String login) {
        return alunoRepository.findById(login)
                .map(aluno -> ResponseEntity.ok("Quantidade de moedas (créditos): " + aluno.getCreditos()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{login}/distribuir-moedas")
    public ResponseEntity<String> distribuirMoedas(
            @PathVariable String login,
            @RequestParam double quantidade) {

        // Buscar o aluno pelo login
        return alunoRepository.findById(login)
                .map(aluno -> {
                    // Atualizar os créditos do aluno
                    double novosCreditos = aluno.getCreditos() + quantidade;
                    aluno.setCreditos(novosCreditos);
                    alunoRepository.save(aluno);

                    return ResponseEntity
                            .ok("Distribuição realizada com sucesso! Novo saldo de créditos: " + aluno.getCreditos());
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{login}/trocar-moedas")
    public Vantagens trocarMoedas(@PathVariable String login, @RequestParam Long idVantagem) {
        return alunoService.trocarVantagem(idVantagem, login);
    }
}
