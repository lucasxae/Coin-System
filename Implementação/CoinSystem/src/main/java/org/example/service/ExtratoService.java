package org.example.service;

import java.util.List;

import org.example.model.Extrato;
import org.example.repository.ExtratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExtratoService {

    @Autowired
    ExtratoRepository extratoRepository;

    public List<Extrato> getAllByAluno(String login) {
        return this.extratoRepository.getAllByAlunoId(login);
    }

    public List<Extrato> getAllByProfessor(String login) {
        return this.extratoRepository.getAllByProfessorId(login);
    }
}
