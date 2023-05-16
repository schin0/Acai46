package godigital.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import godigital.dto.ColaboradorDTO;
import godigital.model.Colaborador;
import godigital.repository.ColaboradorRepository;

@Service
public class ColaboradorService {

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    public List<ColaboradorDTO> listarColaboradores() {
        List<Colaborador> colaboradores = (List<Colaborador>) colaboradorRepository.findAll();
        List<ColaboradorDTO> colaboradoresDTO = new ArrayList<>();

        for (Colaborador colaborador : colaboradores) {
            ColaboradorDTO colaboradorDTO = new ColaboradorDTO(colaborador);

            colaboradoresDTO.add(colaboradorDTO);
        }

        return colaboradoresDTO;
    }
    
}

