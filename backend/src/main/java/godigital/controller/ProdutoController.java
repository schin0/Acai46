package godigital.controller;


import godigital.dto.ProdutoDTO;
import godigital.model.Produto;
import godigital.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/produtos")
public class ProdutoController {

    private ProdutoService produtoService;

    @Autowired
    public ProdutoController(ProdutoService produtoService){
        this.produtoService = produtoService;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("adicionar/")
    public ProdutoDTO adicionarProduto (@RequestBody Produto produto){
        return produtoService.adicionarProduto(produto);
    }

    @CrossOrigin(origins = "*")
    @GetMapping()
    public List<ProdutoDTO> listarProdutos (@RequestParam(required = false) String nome){
        return produtoService.listarProdutos(nome);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("obter/")
    public ProdutoDTO obterProdutos(@RequestParam(required = false)Long id){
        return produtoService.obterProduto(id);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("excluir/*")
    public boolean excluirProduto(@RequestParam(required = false)Long id){
        return produtoService.excluirProduto(id);

    }

    @CrossOrigin(origins = "*")
    @PutMapping("editar/")
    public ProdutoDTO editarProduto(@RequestBody(required = false) ProdutoDTO produtoDTO){
        return produtoService.editarProduto(produtoDTO);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("listar-filtro/")
    public List<Produto> listarProdutoPorNomeECategoria(@RequestParam(required = false)String nome,  Long categoriaId){
        return produtoService.listarProdutoPorNomeECategoria(nome, categoriaId);
    }

}
