package godigital.repository;

import godigital.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	List<Produto> findByNomeContainingIgnoreCase(String nome);
    List<Produto> findByCategoriaId(Long categoriaId);
    List<Produto> findByNomeContainingIgnoreCaseAndCategoriaId(String nome, Long categoriaId);
}