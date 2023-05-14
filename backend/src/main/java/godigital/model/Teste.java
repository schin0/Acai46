package godigital.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "teste")
public class Teste {
	@Id
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "gabriel", length = 10, nullable = true)
	private String gabriel;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGabriel() {
		return gabriel;
	}

	public void setGabriel(String gabriel) {
		this.gabriel = gabriel;
	}
	
}
