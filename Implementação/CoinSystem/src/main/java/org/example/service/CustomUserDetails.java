package org.example.service;

import java.util.Collection;
import java.util.List;

import org.example.Enum.PessoaRoles;
import org.example.model.Aluno;
import org.example.model.Pessoa;
import org.example.model.Professor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {

    private final Pessoa pessoa;

    public CustomUserDetails(Aluno aluno) {
        this.pessoa = aluno;
    }

    public CustomUserDetails(Professor professor) {
        this.pessoa = professor;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.pessoa.getRoles()== PessoaRoles.PROFESSOR) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
        new SimpleGrantedAuthority("ROLE_USER"));

        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return pessoa.getSenha();
    }

    @Override
    public String getUsername() {
        return pessoa.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
