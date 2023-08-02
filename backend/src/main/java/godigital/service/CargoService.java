package godigital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import godigital.model.Cargo;
import godigital.repository.CargoRepository;

@Service
public class CargoService {
	private CargoRepository cargoRepository;

    @Autowired
    public CargoService(CargoRepository cargoRepository) {
    	this.cargoRepository = cargoRepository;
    }
    
    public List<Cargo> listarCargos() {
    	return cargoRepository.findAll();
    }
    
    public Cargo obterCargo(Long usuarioId) {
    	Optional<Cargo> cargoRetorno = cargoRepository.findById(usuarioId);
    	
    	return cargoRetorno.get();
    }
}
