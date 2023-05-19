package godigital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import godigital.request.LoginRequest;
import godigital.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {

	private LoginService loginService;
	
	@Autowired
	public LoginController(LoginService loginService) {
		this.loginService = loginService;
	}
	
	@CrossOrigin(origins = "*")
    @PostMapping()
    public boolean login(@RequestBody LoginRequest loginRequest) {
    	return loginService.login(loginRequest);
    }	
}
