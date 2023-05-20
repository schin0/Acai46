package godigital.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import godigital.dto.ColaboradorDTO;
import godigital.model.Colaborador;
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
        return colaboradorService.listarColaboradores(nome);
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping("obter/")
    public ColaboradorDTO obterColaborador(@RequestParam(required = false) Long id) {
        return colaboradorService.obterColaborador(id);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("editar/")
    public ColaboradorDTO editarColaborador(@RequestBody ColaboradorDTO colaboradorDto) {
        return colaboradorService.editarColaborador(colaboradorDto);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping("adicionar/")
    public ColaboradorDTO adicionarColaborador(@RequestBody Colaborador colaborador) {
        return colaboradorService.adicionarColaborador(colaborador);
    }
}

