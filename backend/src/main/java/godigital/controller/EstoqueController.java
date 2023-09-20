package godigital.controller;


import godigital.dto.EstoqueDTO;
import godigital.dto.ProdutoDTO;
import godigital.model.Produto;
import godigital.service.EstoqueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estoques")
public class EstoqueController {

    private EstoqueService estoqueService;

    public EstoqueController(EstoqueService estoqueService){this.estoqueService = estoqueService;}

    @CrossOrigin(origins = "*")
    @GetMapping()
    public List<EstoqueDTO> listarEstoque (@RequestParam(required = false) String nome){
        return estoqueService.listarEstoque(nome);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("editarQuantidade/")
    public EstoqueDTO editarQuantidadeEstoque(@RequestBody(required = false) EstoqueDTO estoqueDTO ){
        return estoqueService.editarEstoque(estoqueDTO);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("obter/")
    public ProdutoDTO listarEstoquePorId(@RequestParam(required = false) Long id){
        return estoqueService.obterEstoque(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("listar-filtro/")
    public List<Produto> listarProdutoPorNomeECategoria(@RequestParam(required = false)String nome, Long categoriaId){
        return estoqueService.listarEstoquePorNomeECategoria(nome, categoriaId);
    }

}
