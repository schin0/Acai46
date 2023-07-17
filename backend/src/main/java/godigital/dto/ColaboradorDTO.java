package godigital.dto;

import java.util.Date;
import java.util.Optional;

import godigital.model.Cargo;
import godigital.model.Colaborador;

public class ColaboradorDTO {
	private Long id;
    private Cargo cargo;
    private String cpf;
    private String nome;
    private String email;
    private Date dataNascimento;
    private Date dataAdmissao;
    
    public ColaboradorDTO() {
    }
    
    public ColaboradorDTO(Colaborador colaborador) {
        this.id = colaborador.getId();
        this.cargo = colaborador.getCargo();
        this.cpf = colaborador.getCpf();
        this.nome = colaborador.getNome();
        this.email = colaborador.getEmail();
        this.dataNascimento = colaborador.getDataNascimento();
        this.dataAdmissao = colaborador.getDataAdmissao();
        this.cpf = formatarCPF(colaborador.getCpf());
    }
    
    public ColaboradorDTO(Optional<Colaborador> colaboradorOpcional) {
    	if (colaboradorOpcional.isPresent()) {
    		Colaborador colaborador = colaboradorOpcional.get();
	
	        this.id = colaborador.getId();
	        this.cargo = colaborador.getCargo();
	        this.cpf = colaborador.getCpf();
	        this.nome = colaborador.getNome();
	        this.email = colaborador.getEmail();
	        this.dataNascimento = colaborador.getDataNascimento();
	        this.dataAdmissao = colaborador.getDataAdmissao();
	        this.cpf = formatarCPF(colaborador.getCpf());
    	}
    }
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Cargo getCargo() {
		return cargo;
	}
	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getDataNascimento() {
		return dataNascimento;
	}
	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	public Date getDataAdmissao() {
		return dataAdmissao;
	}


	public void setDataAdmissao(Date dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}
	
	private String formatarCPF(String cpf) {
        return cpf.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
    }

	@Override
	public String toString() {
		return "ColaboradorDTO{" +
				"id=" + id +
				", cargo=" + cargo +
				", cpf='" + cpf + '\'' +
				", nome='" + nome + '\'' +
				", email='" + email + '\'' +
				", dataNascimento=" + dataNascimento +
				", dataAdmissao=" + dataAdmissao +
				'}';
	}


}
