package godigital.controller;


import godigital.model.Categoria;
import godigital.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.lang.model.util.Elements;
import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private CategoriaService categoriaService;

    @Autowired
    public CategoriaController (CategoriaService categoriaService){
        this.categoriaService = categoriaService;
    }
    @CrossOrigin(origins = "*")
    @GetMapping()
    public List<Categoria> listarCategoria(){
        return categoriaService.listarCategoria();
    }

}
