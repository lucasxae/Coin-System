package org.example.service;

import org.example.model.Aluno;
import org.example.model.Pessoa;
import org.example.model.Professor;
import org.example.repository.AlunoRepository;
import org.example.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
     @Autowired
     AlunoRepository alunoRepository;

     @Autowired
     ProfessorRepository professorRepository;
     
     public String login(String email, String password) {
        Pessoa pessoa = getPessoaByLogin(email);
        if (pessoa != null) {
            if (pessoa.getSenha().equals(password)) {
                if (pessoa instanceof Aluno) {
                    return "Login bem-sucedido como Aluno!";
                } else if (pessoa instanceof Professor) {
                    return "Login bem-sucedido como Professor!";
                }
            } else {
                if (pessoa instanceof Aluno) {
                    return "Senha incorreta para Aluno!";
                } else if (pessoa instanceof Professor) {
                    return "Senha incorreta para Professor!";
                }
            }
        }
        return "Email não encontrado!";
    }
    
    
    public Pessoa getPessoaByLogin(String login) {
        Pessoa pessoa = alunoRepository.getByLogin(login);
        if (pessoa == null) {
            pessoa = professorRepository.getByLogin(login);
        }
        return pessoa;
    }
}


