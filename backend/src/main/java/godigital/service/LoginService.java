package godigital.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import godigital.dto.LoginDTO;
import godigital.model.Cargo;
import godigital.model.Colaborador;
import godigital.repository.CargoRepository;
import godigital.repository.ColaboradorRepository;
import godigital.request.LoginRequest;

@Service
public class LoginService {

    private ColaboradorRepository colaboradorRepository;
    private CargoRepository cargoRepository;
    
    @Autowired
    public LoginService(ColaboradorRepository colaboradorRepository, CargoRepository cargoRepository) {
    	this.colaboradorRepository = colaboradorRepository;
    	this.cargoRepository = cargoRepository;
    }
    
    public LoginDTO login(LoginRequest request) {
    	Colaborador colaborador = colaboradorRepository.findByNomeContainingIgnoreCase(request.getUsuario()).get(0);
        
        String hash = gerarHash(request.getSenha());
        
        boolean senhaValida = colaborador != null && colaborador.getSenha().equals(hash);
        
        if (!senhaValida)
        	return new LoginDTO();
        
        Optional<Cargo> cargoObtido = cargoRepository.findById(colaborador.getCargo().getId());
        
        if (!cargoObtido.isPresent())
        	return new LoginDTO();

        Cargo cargo = cargoObtido.get();
        
        return new LoginDTO(senhaValida, request.getUsuario(), cargo.getId());
    }
    
    public String gerarHash(String senha) {
        try {
            MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
            byte[] hash = sha1.digest(senha.getBytes());
            StringBuilder hexString = new StringBuilder();

            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // TODO: Tratar exceção
        	return null;
        }
    }
}