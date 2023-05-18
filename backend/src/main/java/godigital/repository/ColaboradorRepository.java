package godigital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import godigital.model.Colaborador;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
	@Query("SELECT new godigital.model.Colaborador(c.nome, c.senha) FROM Colaborador c WHERE c.nome = :nome")
    Colaborador findByNome(String nome);
}
