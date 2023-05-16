package godigital.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import godigital.dto.ColaboradorDTO;
import godigital.service.ColaboradorService;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    @Autowired
    private ColaboradorService colaboradorService;

    @GetMapping
    public List<ColaboradorDTO> listarColaboradores() {
        return (List<ColaboradorDTO>) colaboradorService.listarColaboradores();
    }
}

