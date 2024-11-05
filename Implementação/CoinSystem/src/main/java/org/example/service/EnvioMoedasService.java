package org.example.service;

import java.util.Date;

import org.example.model.Aluno;
import org.example.model.Extrato;
import org.example.model.Professor;
import org.example.repository.ExtratoRepository;
import org.example.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnvioMoedasService {

    @Autowired
    ExtratoRepository extratoRepository;

    @Autowired
    AlunoService alunoService;

    @Autowired
    ProfessorService professorService;

    @Autowired
    ProfessorRepository professorRepository;

    public Extrato enviaMoedas(String loginAluno, String loginProfessor, int quantidadeMoedas) {

        if (alunoService.getAlunoByLogin(loginAluno) == null) {
            throw new RuntimeException("Aluno não encontrado");
        }

        if (professorService.findByLogin(loginProfessor) == null) {
            throw new RuntimeException("Professor não encontrado");
        }

        if (professorService.findByLogin(loginProfessor).getCreditos() < quantidadeMoedas) {
            throw new RuntimeException("Professor não tem moedas suficientes");
        }

        Professor professor = professorRepository.getByLogin(loginProfessor);
        professor.setCreditos(professor.getCreditos() - quantidadeMoedas);
        professorRepository.save(professor);

        Aluno aluno = alunoService.getAlunoByLogin(loginAluno);
        aluno.setCreditos(aluno.getCreditos() + quantidadeMoedas);
        alunoService.updateAluno(aluno, loginAluno);

        var count = 0;
        Extrato extrato = new Extrato();
        extrato.setId(count++ );
        extrato.setAlunoId(aluno.getLogin());
        extrato.setProfessorId(professor.getLogin());
        extrato.setValorEnviado(quantidadeMoedas);
        extrato.setDataEnvio(Date.from(new Date().toInstant()));
        extratoRepository.save(extrato);

        return extrato;
    }
}
