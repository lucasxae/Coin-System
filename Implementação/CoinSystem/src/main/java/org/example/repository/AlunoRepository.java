package org.example.repository;

import java.util.Optional;

import org.example.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;





@Repository
public interface AlunoRepository extends JpaRepository<Aluno, String> {
    public Optional<Aluno> findByCpf(String cpf);
    public Optional<Aluno> findByLogin(String login);

    @Query("SELECT u FROM Aluno u WHERE u.login = :login")
    public Aluno getByLogin(String login);
}
