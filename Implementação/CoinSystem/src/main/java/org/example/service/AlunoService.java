package org.example.service;

import java.util.List;

import org.example.model.Aluno;
import org.example.model.Vantagens;
import org.example.repository.AlunoRepository;
import org.example.repository.VantagensRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlunoService {

    @Autowired
    AlunoRepository alunoRepository;

    @Autowired
    VantagensRepository vantagensRepository;

    public List<Aluno> getAll() {
        return this.alunoRepository.findAll();
    }

    public Aluno getAlunoByLogin(String login) {
        return this.alunoRepository.getByLogin(login);
    }

    public Aluno createAluno(Aluno newAluno) {
        return this.alunoRepository.save(newAluno);
    }

    public Aluno updateAluno(Aluno alunoObj, String login) {
        return alunoRepository.findByLogin(login)
                .map(aluno -> {
                    aluno.setCpf(alunoObj.getCpf());
                    aluno.setCreditos(alunoObj.getCreditos());
                    aluno.setCurso(alunoObj.getCurso());
                    aluno.setInstituicao(alunoObj.getInstituicao());
                    aluno.setLogin(alunoObj.getLogin());
                    aluno.setNome(alunoObj.getNome());
                    aluno.setRg(alunoObj.getRg());
                    aluno.setSenha(alunoObj.getSenha());
                    return alunoRepository.save(aluno);
                }).orElseThrow(() -> new RuntimeException("Não foi possivel Atualizar usuario"));
    }

    private Aluno updateVantageByAluno(Vantagens vantagens, String Login) {
        return alunoRepository.findByLogin(Login)
                .map(aluno -> {
                    aluno.getIdVantagem().add(vantagens);
                    return alunoRepository.save(aluno);
                }).orElseThrow(() -> new RuntimeException("Não foi possivel Atualizar usuario"));
    }

    public void deleteAluno(String login) {
        try {
            alunoRepository.deleteById(login);
        } catch (Exception e) {
            throw new RuntimeException("Não foi possivel adicionar Cliente");
        }
    }

    public List<Vantagens> getVantagens() {
        return vantagensRepository.findAll();
    }

    public Vantagens trocarVantagem(Long idVantagem, String login) {
        Vantagens vantagem = vantagensRepository.findById(idVantagem).get();
        Aluno aluno = alunoRepository.getByLogin(login);
        if (aluno.getCreditos() >= vantagem.getValor()) {
            aluno.setCreditos(aluno.getCreditos() - vantagem.getValor());
            this.updateVantageByAluno(vantagem, login);
            return vantagem;
        } else {
            throw new RuntimeException("Saldo insuficiente");
        }

    }
}
