package org.example.repository;

import java.util.List;

import org.example.model.Aluno;
import org.example.model.Extrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExtratoRepository extends JpaRepository<Extrato, Integer> {

    @Query("SELECT u FROM Extrato u WHERE u.alunoId = :login")
    public List<Extrato> getAllByAlunoId(String login);

    @Query("SELECT u FROM Extrato u WHERE u.professorId = :login")
    public List<Extrato> getAllByProfessorId(String login);

}
