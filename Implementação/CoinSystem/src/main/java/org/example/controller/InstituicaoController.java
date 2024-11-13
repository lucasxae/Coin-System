package org.example.controller;

import java.util.List;

import org.example.model.Instituicao;
import org.example.service.InstituicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/instituicoes")
public class InstituicaoController {

    @Autowired
    private InstituicaoService instituicaoService;

    @GetMapping
    public ResponseEntity<List<Instituicao>> getAllInstituicoes() {
        return new ResponseEntity<>(instituicaoService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instituicao> getInstituicaoById(@PathVariable long id) {
        return instituicaoService.findById(id)
                .map(instituicao -> new ResponseEntity<>(instituicao, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Instituicao> createInstituicao(@RequestBody Instituicao instituicao) {
        return new ResponseEntity<>(instituicaoService.save(instituicao), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instituicao> updateInstituicao(@PathVariable long id, @RequestBody Instituicao updatedInstituicao) {
        return instituicaoService.findById(id)
                .map(instituicao -> {
                    instituicao.setNome(updatedInstituicao.getNome());
                    Instituicao savedInstituicao = instituicaoService.save(instituicao);
                    return new ResponseEntity<>(savedInstituicao, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstituicao(@PathVariable long id) {
        if (instituicaoService.findById(id).isPresent()) {
            instituicaoService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
