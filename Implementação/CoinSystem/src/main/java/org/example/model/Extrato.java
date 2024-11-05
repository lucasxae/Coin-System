package org.example.model;


import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "extrato")
public class Extrato {
    @Id
    private int id;

    private String professorId;

    private String alunoId;

    private int valorEnviado;

    private Date dataEnvio;

    private String mensagem;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProfessorId() {
        return this.professorId;
    }

    public void setProfessorId(String professorId) {
        this.professorId = professorId;
    }

    public String getAlunoId() {
        return this.alunoId;
    }

    public void setAlunoId(String alunoId) {
        this.alunoId = alunoId;
    }

    public int getValorEnviado() {
        return this.valorEnviado;
    }

    public void setValorEnviado(int valorEnviado) {
        this.valorEnviado = valorEnviado;
    }

    public Date getDataEnvio() {
        return this.dataEnvio;
    }

    public void setDataEnvio(Date dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public String getMensagem() {
        return this.mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
