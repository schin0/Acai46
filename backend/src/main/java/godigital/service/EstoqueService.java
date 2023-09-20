package godigital.service;

import godigital.dto.EstoqueDTO;
import godigital.dto.ProdutoDTO;
import godigital.model.Produto;
import godigital.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EstoqueService {
    private ProdutoRepository produtoRepository;

    @Autowired
    public EstoqueService(ProdutoRepository produtoRepository){this.produtoRepository = produtoRepository;}

    public List<EstoqueDTO> listarEstoque(String nome){
        List<Produto> produtos = (List<Produto>) produtoRepository.findByNomeContainingIgnoreCase(nome);
        List<EstoqueDTO> estoqueDTO = new ArrayList<>();

        for (Produto produto : produtos) {
            EstoqueDTO produtoDTO = new EstoqueDTO(produto);

            estoqueDTO.add(produtoDTO);
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
        Optional<Produto> produto = produtoRepository.findById(id);
        return new ProdutoDTO(produto);
    }

    public List<Produto> listarEstoquePorNomeECategoria (String nome, Long id){
        return produtoRepository.findByNomeContainingIgnoreCaseAndCategoriaId(nome, id);
    }


}
