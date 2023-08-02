package godigital.model;

import jakarta.persistence.*;

@Entity
@Table(name = "t_gd_categoria")
public class Categoria {

    @Id
    @Column(name = "ID_CATEGORIA")

    private Long id;

    @Column(name = "NM_CATEGORIA")
    private String nome;

    public Categoria(){};

    public Categoria(String nome){
        this.nome = nome;
    };

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

