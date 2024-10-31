package org.example.controller;

import java.util.List;

import org.example.model.Empresa;
import org.example.service.EmpresaService;
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
@RequestMapping("/empresa")
public class EmpresaController {
    
    @Autowired
    EmpresaService empresaService;

    @GetMapping
    public List<Empresa> findAll() {
        return this.empresaService.getAll();
    }

    @GetMapping("/{cnpj}")
    public ResponseEntity<Empresa> findByCnpj(@PathVariable String cnpj) {
        Empresa empresa = this.empresaService.getEmpresaByCnpj(cnpj);
        if (empresa != null) {
            return ResponseEntity.ok().body(empresa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{cnpj}")
    public ResponseEntity<Empresa> update(@PathVariable String cnpj, @RequestBody Empresa newEmpresa) {
        try {
            this.empresaService.updateEmpresa(newEmpresa, cnpj);
            return ResponseEntity.ok(newEmpresa);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cnpj}")
    public ResponseEntity<Void> delete(@PathVariable String cnpj) {
        this.empresaService.deleteEmpresa(cnpj);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Empresa> create(@RequestBody Empresa newEmpresa) {
        try {
            this.empresaService.createEmpresa(newEmpresa);
            return ResponseEntity.ok().body(newEmpresa);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
