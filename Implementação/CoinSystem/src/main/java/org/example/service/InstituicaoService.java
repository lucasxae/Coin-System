package org.example.service;

import java.util.List;
import java.util.Optional;

import org.example.model.Instituicao;
import org.example.repository.InstituicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstituicaoService {

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    public List<Instituicao> findAll() {
        return instituicaoRepository.findAll();
    }

    public Optional<Instituicao> findById(long id) {
        return instituicaoRepository.findById(id);
    }

    public Instituicao save(Instituicao instituicao) {
        return instituicaoRepository.save(instituicao);
    }

    public void deleteById(long id) {
        instituicaoRepository.deleteById(id);
    }
}
