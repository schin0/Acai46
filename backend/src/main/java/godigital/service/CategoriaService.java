package godigital.service;


import godigital.model.Categoria;
import godigital.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService (CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
   }

   public List<Categoria> listarCategoria(){
        return categoriaRepository.findAll();
   }

}
