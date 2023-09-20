package godigital.model;


import jakarta.persistence.*;

import java.math.BigDecimal;


@Entity
@Table(name = "T_GD_PRODUTO")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PRODUTO")
    private Long id;

    @Column(name = "NM_PRODUTO")
    private String nome;

    @ManyToOne
    @JoinColumn(name = "t_gd_categoria_id_categoria")
    private Categoria categoria;

    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "VL_PRECO")
    private BigDecimal preco;

    @Column(name = "VL_QUANTIDADE")
    private Integer quantidade;

    @Column(name = "QT_MINIMA")
    private Integer quantidadeMinima;
    public Produto(){};

    public Produto(String nome, Categoria categoria, String descricao, BigDecimal preco){
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.preco = preco;
    }

    public Produto(String nome, Categoria categoria, String descricao, BigDecimal preco, Integer quantidade, Integer quantidadeMinima){
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.quantidadeMinima = quantidadeMinima;
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

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getQuantidadeMinima() {
        return quantidadeMinima;
    }

    public void setQuantidadeMinima(Integer quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }

}

