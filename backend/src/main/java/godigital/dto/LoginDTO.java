package godigital.dto;

public class LoginDTO {
	
    public LoginDTO(){};
    
    public LoginDTO(boolean acessoLiberado, String usuarioNome, Long usuarioCargoId){
    	this.acessoLiberado = acessoLiberado;
    	this.usuarioNome = usuarioNome;
    	this.usuarioCargoId = usuarioCargoId;    	
    };

	private boolean acessoLiberado;
	
	private String usuarioNome;
	
	private Long usuarioCargoId;

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
	
}
