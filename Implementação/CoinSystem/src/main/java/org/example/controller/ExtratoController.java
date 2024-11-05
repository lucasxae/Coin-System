package org.example.controller;

import java.util.List;

import org.example.model.Extrato;
import org.example.service.ExtratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/Extrato")
public class ExtratoController {

    @Autowired
    ExtratoService extratoService;

    @GetMapping
    public List<Extrato> getExtratoByALuno(@RequestParam String alunoId) {
        return this.extratoService.getAllByAluno(alunoId);
    }

    @GetMapping("/professor")
    public List<Extrato> getExtratoByProfessor(@RequestParam String professorId) {
        return this.extratoService.getAllByProfessor(professorId);
    }

}
