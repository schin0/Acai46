package godigital.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import godigital.dto.ColaboradorDTO;
import godigital.service.ColaboradorService;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    private ColaboradorService colaboradorService;
    
    @Autowired
    public ColaboradorController(ColaboradorService colaboradorService) {
    	this.colaboradorService = colaboradorService;
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping
    public List<ColaboradorDTO> listarColaboradores(@RequestParam(required = false) String nome) {
        return (List<ColaboradorDTO>) colaboradorService.listarColaboradores(nome);
    }
}

