package org.example.controller;

import org.example.DTO.VantagemDTO;
import org.example.service.AlunoService;
import org.example.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Vantagens")
public class VantagemController {

    @Autowired
    EmpresaService empresaService;

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
}
