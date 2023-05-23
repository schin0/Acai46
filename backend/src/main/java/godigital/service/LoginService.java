package godigital.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import godigital.model.Colaborador;
import godigital.repository.ColaboradorRepository;
import godigital.request.LoginRequest;

@Service
public class LoginService {

    private ColaboradorRepository colaboradorRepository;
    
    @Autowired
    public LoginService(ColaboradorRepository colaboradorRepository) {
    	this.colaboradorRepository = colaboradorRepository;
    }
    
    public boolean login(LoginRequest request) {
    	Colaborador colaborador = colaboradorRepository.findByNome(request.getUsuario());
        
        String hash = gerarHash(request.getSenha());
        
        return colaborador != null && colaborador.getSenha().equals(hash);
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