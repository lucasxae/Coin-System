package org.example.model;

import org.example.Enum.PessoaRoles;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract  class Pessoa {

    private String nome;
 
    
    private String cpf;

    private double creditos;

    private String senha;
    @Id
    private String login;

    @Column(name="roles")
    private PessoaRoles roles;

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public double getCreditos() {
        return this.creditos;
    }

    public void setCreditos(double creditos) {
        this.creditos = creditos;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public PessoaRoles getRoles() {
        return this.roles;
    }

    public void setRoles(PessoaRoles roles) {
        this.roles = roles;
    }

    

}
