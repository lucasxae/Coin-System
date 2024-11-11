package org.example.service;

import java.util.List;
import java.util.Optional;

import org.example.DTO.VantagemDTO;
import org.example.model.Empresa;
import org.example.model.Vantagens;
import org.example.repository.EmpresaRepository;
import org.example.repository.VantagensRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {
    @Autowired
    EmpresaRepository empresaRepository;

    @Autowired
    VantagensRepository vantagensRepository;

    public List<Empresa> getAll() {
        return this.empresaRepository.findAll();
    }

    public Empresa getEmpresaByCnpj(String cnpj) {
        return this.empresaRepository.getByCnpj(cnpj);
    }

    public Empresa createEmpresa(Empresa newEmpresa) {
        if (empresaRepository.getByCnpj(newEmpresa.getCnpj()) == null) {
            return this.empresaRepository.save(newEmpresa);
        } else {
            throw new RuntimeException("Não foi possivel cadastrar empresa. CNPJ já cadastrado");
        }
    }

    public Empresa updateEmpresa(Empresa empresaObj, String cnpj) {
        Empresa empresa = empresaRepository.getByCnpj(cnpj);
        if (empresa != null) {
            empresa.setCnpj(empresaObj.getCnpj());
            empresa.setNome(empresaObj.getNome());
            return empresaRepository.save(empresa);
        } else {
            throw new RuntimeException("Não foi possível atualizar empresa.");
        }
    }

    public void deleteEmpresa(String cnpj) {
        try {
            empresaRepository.deleteByCnpj(cnpj);
        } catch (Exception e) {
            throw new RuntimeException("Não foi possivel deletar empresa.");
        }
    }
    public Vantagens adicionarVantagem(VantagemDTO vantagem){
       Vantagens novaVantagem= new Vantagens(vantagem.descricao(),vantagem.foto(),vantagem.valor());
       Optional<Empresa> empresaCadastrada=this.empresaRepository.findById(vantagem.idEmpresa());
       Empresa obj=empresaCadastrada.get();
       novaVantagem.setEmpresa(obj);
       return this.vantagensRepository.save(novaVantagem);
    }

}