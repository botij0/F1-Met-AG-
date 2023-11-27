package com.f1metag.Usuario.Services;

import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Usuario.Models.Rol;
import com.f1metag.Usuario.Models.Usuario;
import com.f1metag.Usuario.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;


    public ArrayList<Usuario> getAllUsers(){
        return (ArrayList<Usuario>) usuarioRepository.findAll();
    }

    public Usuario getAuthenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var username = authentication.getName();
        return usuarioRepository.findByUsername(username).orElseThrow();
    }

    public ArrayList<Usuario> getNotValidatedUsers(){
        Optional<ArrayList<Usuario>> optional = usuarioRepository.findByEstadoFalse();
        ArrayList<Usuario> noValidados = new ArrayList<Usuario>();
        if (optional.isPresent()){
            noValidados = optional.get();
        }
        return noValidados;
    }

    public ApiResponse actualizarResponsable(Long id){

        Optional<Usuario> optional = usuarioRepository.findById(id);
        if(optional.isPresent()) {
            Usuario usuario = optional.get();
            usuario.setEstado(false);
            usuario.setRol(Rol.RESPONSABLE);
            usuarioRepository.save(usuario);
            return ApiResponse.successRequest("Responsable actualizado correctamente en la base de datos", usuario).getBody();
        }
        return ApiResponse.successRequest("Responsable no se ha actualizado correctamente en la base de datos", optional.get()).getBody();

    }

    public ApiResponse actualizarAdmin(Long id){

        Optional<Usuario> optional = usuarioRepository.findById(id);
        if(optional.isPresent()) {
            Usuario usuario = optional.get();
            usuario.setEstado(false);
            usuario.setRol(Rol.ADMIN);
            usuarioRepository.save(usuario);
            return ApiResponse.successRequest("Administrador actualizado correctamente en la base de datos", usuario).getBody();
        }
        return ApiResponse.successRequest("Administrador no se ha actualizado correctamente en la base de datos", optional.get()).getBody();

    }

}
