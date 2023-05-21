package godigital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import godigital.model.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {

}
