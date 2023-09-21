package godigital.dto;

import java.math.BigDecimal;
import java.util.Optional;

import godigital.model.Categoria;
import godigital.model.Produto;

public class EstoqueDTO {
    private Long id;

    private String nome;

    private Categoria categoria;

    private BigDecimal preco;

    private Integer quantidade;

    private Integer quantidadeMinima;

    public EstoqueDTO(){};
    
    public EstoqueDTO(Optional<Produto> produtoOpcional) {
        if (produtoOpcional.isPresent()) {
            Produto produto = produtoOpcional.get();

            this.id = produto.getId();
            this.nome = produto.getNome();
            this.categoria = produto.getCategoria();
            this.preco = produto.getPreco();
            this.quantidade = produto.getQuantidade();
            this.quantidadeMinima = produto.getQuantidadeMinima();
        }
    }
    
    public EstoqueDTO (Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.categoria = produto.getCategoria();
        this.preco = produto.getPreco();
        this.quantidade = produto.getQuantidade();
        this.quantidadeMinima = produto.getQuantidadeMinima();
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
    
	@Override
    public String toString() {
        return "EstoqueDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", categoria=" + categoria +
                ", quantidade='" + quantidade + '\'' +
                ", quantidadeMinima=" + quantidadeMinima +
                '}';
    }
    
}
