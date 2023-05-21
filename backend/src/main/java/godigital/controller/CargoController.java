package godigital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import godigital.model.Cargo;
import godigital.service.CargoService;

@RestController
@RequestMapping("/cargo")
public class CargoController {

	private CargoService cargoService;
    
    @Autowired
    public CargoController(CargoService cargoService) {
    	this.cargoService = cargoService;
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping
    public List<Cargo> listarCargos() {
        return cargoService.listarCargos();
    }
}
