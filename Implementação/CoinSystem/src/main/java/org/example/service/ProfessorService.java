package org.example.service;

import java.util.List;

import org.example.model.Professor;
import org.example.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService {
    @Autowired
    private ProfessorRepository professorRepository;
    
    public List<Professor> findAll(){
        return this.professorRepository.findAll();
    }
    public Professor findByLogin(String login){
        return this.professorRepository.getByLogin(login);
    }
    
    public Professor createProfessor(Professor newProfessor){
     return this.professorRepository.save(newProfessor);   
    }
    public Professor updateProfessor(String cpf, Professor professorUpdated){ 
        return this.professorRepository.findByCpf(cpf)
        .map(Professor->{
            Professor.setCreditos(professorUpdated.getCreditos());
            Professor.setLogin(professorUpdated.getLogin());
            Professor.setSenha(professorUpdated.getSenha());
            Professor.setDepartamento(professorUpdated.getDepartamento());
            return this.professorRepository.save(Professor);
        }).orElseThrow(()->new RuntimeException("Não foi possivel Atualizar usuario"));
    }
    public void  deleteByCpf(String cpf){
        try {
            professorRepository.deleteById(cpf);
          } catch (Exception e) {
              throw new RuntimeException("Não foi possivel adicionar Cliente");
          }
    }
    
}
