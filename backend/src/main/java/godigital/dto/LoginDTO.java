package godigital.dto;

public class LoginDTO {
	
    public LoginDTO(){};
    
    public LoginDTO(boolean primeiroAcesso) {
    	setPrimeiroAcesso(primeiroAcesso);
    };
    
    public LoginDTO(boolean acessoLiberado, boolean primeiroAcesso, String usuarioNome, Long usuarioCargoId) {
    	setAcessoLiberado(acessoLiberado);
    	setUsuarioNome(usuarioNome);
    	setUsuarioCargoId(usuarioCargoId);
    	setPrimeiroAcesso(primeiroAcesso);
    };

	private boolean acessoLiberado;
	
	private String usuarioNome;
	
	private Long usuarioCargoId;
	
	private boolean primeiroAcesso;

	public boolean isAcessoLiberado() {
		return acessoLiberado;
	}

	public void setAcessoLiberado(boolean acessoLiberado) {
		this.acessoLiberado = acessoLiberado;
	}
	
	public String getUsuarioNome() {
		return usuarioNome;
	}
	
	public void setUsuarioNome(String usuarioNome) {
		this.usuarioNome = usuarioNome;
	}
	
	public Long getUsuarioCargoId() {
		return usuarioCargoId;
	}
	
	public void setUsuarioCargoId(Long usuarioCargoId) {
		this.usuarioCargoId = usuarioCargoId;
	}
	
	public boolean isPrimeiroAcesso() {
		return primeiroAcesso;
	}

	public void setPrimeiroAcesso(boolean primeiroAcesso) {
		this.primeiroAcesso = primeiroAcesso;
	}
}
