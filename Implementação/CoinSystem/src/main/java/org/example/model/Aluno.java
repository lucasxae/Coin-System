package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="aluno")
public class Aluno extends Pessoa{

    private String rg;

    @ManyToOne
    @JoinColumn(name="instituicao_id")
    private Instituicao instituicao;

    @ManyToOne
    @JoinColumn(name="curso_id")
    private Curso curso;

    public String getRg() {
        return this.rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public Instituicao getInstituicao() {
        return this.instituicao;
    }

    public void setInstituicao(Instituicao instituicao) {
        this.instituicao = instituicao;
    }

    public Curso getCurso() {
        return this.curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }


}
