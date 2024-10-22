package org.example.repository;


import java.util.Optional;

import org.example.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface ProfessorRepository extends JpaRepository<Professor, String>{
 public Optional<Professor> findByCpf(String cpf);
 public Optional<Professor> findByLogin(String login);

 @Query("SELECT u FROM Professor u WHERE u.login = :login")
 public Professor getByLogin(String login);
}
