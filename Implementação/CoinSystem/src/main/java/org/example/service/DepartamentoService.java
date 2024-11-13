package org.example.service;

import java.util.List;
import java.util.Optional;

import org.example.model.Departamento;
import org.example.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    public List<Departamento> findAll() {
        return departamentoRepository.findAll();
    }

    public Optional<Departamento> findById(long id) {
        return departamentoRepository.findById(id);
    }

    public Departamento save(Departamento departamento) {
        return departamentoRepository.save(departamento);
    }

    public Departamento update(long id, Departamento updatedDepartamento) {
        return departamentoRepository.findById(id).map(departamento -> {
            departamento.setNome(updatedDepartamento.getNome());
            return departamentoRepository.save(departamento);
        }).orElse(null);
    }

    public void delete(long id) {
        departamentoRepository.deleteById(id);
    }
}
