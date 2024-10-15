package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="profesor")
public class Professor extends Pessoa{
    
    @ManyToOne
    @JoinColumn(name="departamento_id")
    private Departamento departamento;

    public Departamento getDepartamento() {
        return this.departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }


}
