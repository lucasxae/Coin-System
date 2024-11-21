package org.example.service;

import java.util.List;

import org.example.model.Vantagens;
import org.example.repository.VantagensRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VantagensService {

    @Autowired
    VantagensRepository vantagensRepository;

    @Autowired
    AlunoService alunoService;

    public List<Vantagens> getAllByAluno(String Login) {
        return alunoService.getAlunoByLogin(Login).getIdVantagem();
    }
}
