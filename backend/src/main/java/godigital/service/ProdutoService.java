package godigital.service;

import godigital.dto.ProdutoDTO;

import godigital.model.Produto;
import godigital.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoService (ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
    }

    public ProdutoDTO adicionarProduto (Produto produto) {
        return new ProdutoDTO (produtoRepository.save(produto));
    }


    public List<ProdutoDTO> listarProdutos(String nome) {
        List<Produto> produtos = (List<Produto>) produtoRepository.findByNomeContainingIgnoreCase(nome);
        List<ProdutoDTO> produtosDTO = new ArrayList<>();

        for (Produto produto : produtos) {
            ProdutoDTO produtoDTO = new ProdutoDTO(produto);

            produtosDTO.add(produtoDTO);
        }

        return produtosDTO;
    }

    public List<Produto> listarProdutoPorNomeECategoria(String nome,Long categoriaId){

        return produtoRepository.findByNomeContainingIgnoreCaseAndCategoriaId(nome, categoriaId);

        /* List<Produto> produtos = (List<Produto>) produtoRepository.findByNomeAndCategoriaId(nome, categoriaId);
        List<ProdutoDTO> produtosDTO = new ArrayList<>();

        for(Produto produto :produtos){
            ProdutoDTO produtoDTO =  new ProdutoDTO(produto);

            produtosDTO.add(produtoDTO);
        }
      return produtosDTO;*/
    }

    public ProdutoDTO obterProduto(Long id){
        Optional<Produto> produto = produtoRepository.findById(id);
        return new ProdutoDTO(produto);
    }

    public boolean excluirProduto(Long id){
        produtoRepository.deleteById(id);
        return true;
    }

    public ProdutoDTO editarProduto(ProdutoDTO produtoDTO){
        var produtoAtual = produtoRepository.findById(produtoDTO.getId());
        var produtoRetorno = new ProdutoDTO();

        if(produtoAtual.isPresent()){
            var produto = produtoAtual.get();

            produto.setNome(produtoDTO.getNome());
            produto.setCategoria(produtoDTO.getCategoria());
            produto.setDescricao(produtoDTO.getDescricao());
            produto.setPreco(produtoDTO.getPreco());

            produtoRetorno = new ProdutoDTO(produtoRepository.save(produto));


        }
        return produtoRetorno;
    }






}
