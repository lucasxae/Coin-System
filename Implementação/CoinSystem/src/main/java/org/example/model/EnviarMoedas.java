package org.example.model;

public class EnviarMoedas {
    String loginAluno;
    String loginProfessor;
    int quantidadeMoedas;

    public String getLoginAluno() {
        return this.loginAluno;
    }

    public void setLoginAluno(String loginAluno) {
        this.loginAluno = loginAluno;
    }

    public String getLoginProfessor() {
        return this.loginProfessor;
    }

    public void setLoginProfessor(String loginProfessor) {
        this.loginProfessor = loginProfessor;
    }

    public int getQuantidadeMoedas() {
        return this.quantidadeMoedas;
    }

    public void setQuantidadeMoedas(int quantidadeMoedas) {
        this.quantidadeMoedas = quantidadeMoedas;
    }
}