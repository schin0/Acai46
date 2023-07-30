package godigital.model;


import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "t_gd_produto")
@SequenceGenerator(name = "sequencia_1", sequenceName = "sequencia_1", allocationSize = 1)

public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequencia_1" )
    @Column(name = "id_produto")
    private Long id;

    @Column(name = "nm_produto")
    private String nome;

    @ManyToOne
    @JoinColumn(name = "t_gd_categoria_id_categoria")
    private Categoria categoria;

    @Column(name = "ds_produto")
    private String descricao;

    @Column(name = "preco")
    private BigDecimal preco;

    public Produto(){};

    public Produto(String nome, Categoria categoria, String descricao, BigDecimal preco){
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.preco = preco;
    }

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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }
}

