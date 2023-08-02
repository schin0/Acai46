package godigital.dto;

import godigital.model.Categoria;
import godigital.model.Colaborador;
import godigital.model.Produto;

import java.math.BigDecimal;
import java.util.Optional;

public class ProdutoDTO {

    private Long id;

    private String nome;

    private Categoria categoria;

    private String descricao;

    private BigDecimal preco;

    public ProdutoDTO(){};

    public ProdutoDTO(Optional<Produto> produtoOpcional) {
        if (produtoOpcional.isPresent()) {
            Produto produto = produtoOpcional.get();

            this.id = produto.getId();
            this.nome = produto.getNome();
            this.categoria = produto.getCategoria();
            this.descricao = produto.getDescricao();
            this.preco = produto.getPreco();
        }
    }

    public ProdutoDTO (Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.categoria = produto.getCategoria();
        this.descricao = produto.getDescricao();
        this.preco = produto.getPreco();
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

    @Override
    public String toString() {
        return "ProdutoDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", categoria=" + categoria +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                '}';
    }
}
