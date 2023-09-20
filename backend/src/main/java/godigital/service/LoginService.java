package godigital.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.Random;

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
    private EmailService emailService;
    
    @Autowired
    public LoginService(ColaboradorRepository colaboradorRepository, CargoRepository cargoRepository, EmailService emailService) {
    	this.colaboradorRepository = colaboradorRepository;
    	this.cargoRepository = cargoRepository;
    	this.emailService = emailService;
    }
    
    public LoginDTO login(LoginRequest request) {
    	Colaborador colaborador = colaboradorRepository.findByNomeContainingIgnoreCase(request.getUsuario()).get(0);
        
        String hash = gerarHash(request.getSenha());
        
        boolean senhaValida = colaborador != null && colaborador.getSenha().equals(hash);
        
        if (!senhaValida)
        	return new LoginDTO();
        
        if (colaborador.getPrimeiroAcesso()) {
        	enviarEmail(colaborador.getEmail(), "Código de Acesso", processarMensagemPrimeiroAcesso());
        	
        	return new LoginDTO(colaborador.getPrimeiroAcesso());
        }
        
        Optional<Cargo> cargoObtido = cargoRepository.findById(colaborador.getCargo().getId());
        
        if (!cargoObtido.isPresent())
        	return new LoginDTO();

        Cargo cargo = cargoObtido.get();
        
        return new LoginDTO(senhaValida, colaborador.getPrimeiroAcesso(), request.getUsuario(), cargo.getId());
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
        	return null;
        }
    }
    
    private void enviarEmail(String destinatario, String assunto, String mensagem) {
    	emailService.enviarEmail(destinatario, assunto, mensagem);
    }
    
    private String processarMensagemPrimeiroAcesso() {
    	return "Olá! Vimos que você está tentando acessar nosso sistema pela primeira vez. Para isso, utilize o seguinte código: " + gerarCodigoPrimeiroAcesso();
    }
    
    private String gerarCodigoPrimeiroAcesso() {
    	String CARACTERES_VALIDOS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    	int quantidadeCaracteres = 5;
    	
    	StringBuilder sb = new StringBuilder(quantidadeCaracteres);
        Random random = new Random();

        for (int i = 0; i < quantidadeCaracteres; i++) {
            int indice = random.nextInt(CARACTERES_VALIDOS.length());
            char caractere = CARACTERES_VALIDOS.charAt(indice);
            sb.append(caractere);
        }

        return sb.toString();
    }
}