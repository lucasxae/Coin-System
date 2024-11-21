package org.example.controller;

import java.util.List;

import org.example.DTO.VantagemDTO;
import org.example.model.Vantagens;
import org.example.service.AlunoService;
import org.example.service.EmpresaService;
import org.example.service.VantagensService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/Vantagens")
public class VantagemController {

    @Autowired
    EmpresaService empresaService;

    @Autowired
    VantagensService vantagensService;

    @Autowired
    AlunoService alunoService;

    @SuppressWarnings("rawtypes")
    @PostMapping
    public ResponseEntity adicionarVantagem(@RequestBody VantagemDTO obj) {
        return ResponseEntity.ok(this.empresaService.adicionarVantagem(obj));

    }

    @SuppressWarnings("rawtypes")
    @GetMapping
    public ResponseEntity getVantagens() {
        return ResponseEntity.ok(alunoService.getVantagens());
    }

    @GetMapping("{login}")
    public List<Vantagens> getvVantagensByAluno(@PathVariable String login) {
        return vantagensService.getAllByAluno(login);
    }

}
