package godigital.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "T_GD_COLABORADOR")
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "T_GD_CARGO_ID_CARGO")
    private Cargo cargo;

    @Column(name = "CPF")
    private String cpf;

    @Column(name = "NM_COLABORADOR")
    private String nome;

    @Column(name = "DS_EMAIL")
    private String email;

    @Column(name = "SENHA")
    private String senha;

    @Column(name = "DT_NASCIMENTO")
    private Date dataNascimento;

    @Column(name = "DT_ADMISSAO")
    private Date dataAdmissao;

    public Colaborador() {
    }

    public Colaborador(String nome, String senha) {
    	setNome(nome);
    	setSenha(senha);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Date getDataAdmissao() {
        return dataAdmissao;
    }

    public void setDataAdmissao(Date dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }



}
