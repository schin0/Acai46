package godigital.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
	@GetMapping("/usuarios")
	public String retornarSucesso() {
		return "API no ar com sucesso";
	}
}
