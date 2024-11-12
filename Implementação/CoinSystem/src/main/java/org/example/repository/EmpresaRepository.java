package org.example.repository;



import org.example.model.Empresa;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    @Query("SELECT e FROM Empresa e WHERE e.cnpj = :cnpj")
    public Empresa getByCnpj(String cnpj);

    // delete by Cnpj
    public void deleteByCnpj(String cnpj);
}