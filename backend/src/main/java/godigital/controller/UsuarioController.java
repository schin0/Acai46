package godigital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import godigital.model.ITeste;
import godigital.model.Teste;

@RestController
public class UsuarioController {
	
	@Autowired
	private ITeste dao;

	@CrossOrigin(origins = "*")
	@GetMapping("/teste")
	public List<Teste> listarColaboradores() {
		return (List<Teste>)dao.findAll();
	}
}
