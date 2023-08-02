package godigital.model;

import jakarta.persistence.*;

@Entity
@Table(name = "T_GD_CARGO")
public class Cargo {

    @Id
    @Column(name = "ID_CARGO")
    private Long id;

    @Column(name = "DS_CARGO")
    private String descricao;
    
    public Cargo(){};
    
    public Cargo(String descricao, Long id){
    	this.id = id;
    	this.descricao = descricao;
    };

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}

