package org.example.Enum;

public enum PessoaRoles {

ALUNO("aluno"),

PROFESSOR("professor");

private String role;


PessoaRoles(String role){
    this.role=role;
}

public String getRole(){
return this.role;
}
}
