package org.example.repository;

import org.example.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  AlunoRepository extends JpaRepository<Aluno, String> {

}
