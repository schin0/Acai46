package godigital.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import godigital.dto.EstoqueDTO;
import godigital.dto.ProdutoDTO;
import godigital.model.Produto;
import godigital.repository.ProdutoRepository;

@Service
public class EstoqueService {
	private ProdutoRepository produtoRepository;

    @Autowired
    public EstoqueService(ProdutoRepository produtoRepository) {
    	this.produtoRepository = produtoRepository;
	}

    public List<EstoqueDTO> listarEstoque(String nome){
        List<Produto> produtos = (List<Produto>) produtoRepository.findByNomeContainingIgnoreCase(nome);
        List<EstoqueDTO> estoqueDTO = new ArrayList<>();

        for (Produto produto : produtos) {
            estoqueDTO.add(new EstoqueDTO(produto));
        }

        return estoqueDTO;
    }

    public EstoqueDTO editarEstoque( EstoqueDTO estoqueDTO){
        var estoqueAtual = produtoRepository.findById(estoqueDTO.getId());
        var estoqueRetorno = new EstoqueDTO();

        if(estoqueAtual.isPresent()){
            var estoque = estoqueAtual.get();

            estoque.setQuantidade(estoqueDTO.getQuantidade());
            estoque.setQuantidadeMinima(estoqueDTO.getQuantidadeMinima());

            estoqueRetorno = new EstoqueDTO(produtoRepository.save(estoque));
        }
        
        return estoqueRetorno;
    }

    public ProdutoDTO obterEstoque(Long id){
        return new ProdutoDTO(produtoRepository.findById(id));
    }

    public List<Produto> listarEstoquePorNomeECategoria (String nome, Long id){
        return produtoRepository.findByNomeContainingIgnoreCaseAndCategoriaId(nome, id);
    }
}
