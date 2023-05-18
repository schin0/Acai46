package godigital.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import godigital.dto.ColaboradorDTO;
import godigital.model.Colaborador;
import godigital.request.LoginRequest;
import godigital.service.ColaboradorService;
import godigital.service.LoginService;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    private ColaboradorService colaboradorService;
    private LoginService loginService;
    
    @Autowired
    public ColaboradorController(ColaboradorService colaboradorService, LoginService loginService) {
    	this.colaboradorService = colaboradorService;
    	this.loginService = loginService;
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping
    public List<ColaboradorDTO> listarColaboradores() {
        return (List<ColaboradorDTO>) colaboradorService.listarColaboradores();
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public boolean login(@RequestBody LoginRequest loginRequest) {
    	return loginService.login(loginRequest);
    }	
}

