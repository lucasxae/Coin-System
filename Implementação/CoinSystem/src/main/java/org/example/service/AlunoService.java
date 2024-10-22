package org.example.service;

import java.util.List;

import org.example.model.Aluno;
import org.example.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlunoService {
    @Autowired
    AlunoRepository alunoRepository;

    public List<Aluno> getAll(){
        return this.alunoRepository.findAll();
    }
    
    public Aluno getAlunoByLogin(String login){
        return this.alunoRepository.getByLogin(login);
    }
    public Aluno createAluno(Aluno newAluno){
     return this.alunoRepository.save(newAluno);   
    }
    public Aluno updateAluno(Aluno alunoObj, String cpf){
        return alunoRepository.findByCpf(cpf)
        .map(aluno->{
            aluno.setCpf(alunoObj.getCpf());
            aluno.setCreditos(alunoObj.getCreditos());
            aluno.setCurso(alunoObj.getCurso());
            aluno.setInstituicao(alunoObj.getInstituicao());
            aluno.setLogin(alunoObj.getLogin());
            aluno.setNome(alunoObj.getNome());
            aluno.setRg(alunoObj.getRg());
            aluno.setSenha(alunoObj.getSenha());
            return alunoRepository.save(aluno);
        }).orElseThrow(()->new RuntimeException("Não foi possivel Atualizar usuario"));
    }
    public void deleteAluno(String cpf){
        try {
          alunoRepository.deleteById(cpf);
        } catch (Exception e) {
            throw new RuntimeException("Não foi possivel adicionar Cliente");
        }
    }
}
