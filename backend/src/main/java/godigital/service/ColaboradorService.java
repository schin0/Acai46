package godigital.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import godigital.dto.ColaboradorDTO;
import godigital.model.Colaborador;
import godigital.repository.ColaboradorRepository;

@Service
public class ColaboradorService {

    private ColaboradorRepository colaboradorRepository;
    private LoginService loginService;

    @Autowired
    public ColaboradorService(ColaboradorRepository colaboradorRepository, LoginService loginService) {
    	this.colaboradorRepository = colaboradorRepository;
    	this.loginService = loginService;
    }
    
    public List<ColaboradorDTO> listarColaboradores(String nome) {
        List<Colaborador> colaboradores = (List<Colaborador>) colaboradorRepository.findByNomeContainingIgnoreCase(nome);
        List<ColaboradorDTO> colaboradoresDTO = new ArrayList<>();

        for (Colaborador colaborador : colaboradores) {
            ColaboradorDTO colaboradorDTO = new ColaboradorDTO(colaborador);

            colaboradoresDTO.add(colaboradorDTO);
        }

        return colaboradoresDTO;
    }
    
    public ColaboradorDTO obterColaborador(Long id) {
    	Optional<Colaborador> colaborador = colaboradorRepository.findById(id);
    	
    	return new ColaboradorDTO(colaborador);
    }
    
    public ColaboradorDTO editarColaborador(ColaboradorDTO colaboradorDto) {
    	var colaboradorAtual = colaboradorRepository.findById(colaboradorDto.getId());
    	var colaboradorRetorno = new ColaboradorDTO();
    	
    	if (colaboradorAtual.isPresent()) {
    		var colaborador = colaboradorAtual.get();
    		
    		colaborador.setNome(colaboradorDto.getNome());
    		colaborador.setEmail(colaboradorDto.getEmail());
    		colaborador.setCpf(colaboradorDto.getCpf());
    		colaborador.setCargo(colaboradorDto.getCargo());
    		colaborador.setDataNascimento(colaboradorDto.getDataNascimento());
    		colaborador.setDataAdmissao(colaboradorDto.getDataAdmissao());
    		
    		colaboradorRetorno = new ColaboradorDTO(colaboradorRepository.save(colaborador));
    	}

    	return colaboradorRetorno;
    }
    
    public ColaboradorDTO adicionarColaborador(Colaborador colaborador) {
    	colaborador.setId(1L);
    	
    	colaborador.setSenha(loginService.gerarHash(colaborador.getSenha()));;
    	
    	return new ColaboradorDTO(colaboradorRepository.save(colaborador));
    }
    
    public boolean excluirColaborador(Long id) {
    	colaboradorRepository.deleteById(id);
    	
    	return true;
    }
    
}

