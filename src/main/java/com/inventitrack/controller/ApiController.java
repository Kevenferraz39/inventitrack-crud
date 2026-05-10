package com.inventitrack.controller;

import com.inventitrack.model.*;
import com.inventitrack.repository.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    @Autowired
    private BaseRepository repo;

    @GetMapping("/produtos")
    public List<Produto> getProdutos() throws Exception { return repo.listar("produtos", Produto.class); }

    @PostMapping("/produtos")
    public String saveProduto(@RequestBody Produto p) throws Exception { 
        String id = (p.getId() == null || p.getId().isEmpty()) ? UUID.randomUUID().toString() : p.getId();
        return repo.salvar("produtos", id, p); 
    }

    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios() throws Exception { return repo.listar("usuarios", Usuario.class); }

    @PostMapping("/usuarios")
    public String saveUsuario(@RequestBody Usuario u) throws Exception { 
        String id = (u.getId() == null || u.getId().isEmpty()) ? UUID.randomUUID().toString() : u.getId();
        return repo.salvar("usuarios", id, u); 
    }

    @GetMapping("/retiradas")
    public List<Retirada> getRetiradas() throws Exception { return repo.listar("retiradas", Retirada.class); }

    @PostMapping("/retiradas")
    public String saveRetirada(@RequestBody Retirada r) throws Exception { 
        String id = (r.getId() == null || r.getId().isEmpty()) ? UUID.randomUUID().toString() : r.getId();
        return repo.salvar("retiradas", id, r); 
    }
}