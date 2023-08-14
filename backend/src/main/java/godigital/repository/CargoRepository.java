package godigital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import godigital.model.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
	@Query("SELECT new godigital.model.Cargo(c.descricao, c.id) FROM Cargo c WHERE c.id = :id")
    Optional<Cargo> findById(Long id);
}
