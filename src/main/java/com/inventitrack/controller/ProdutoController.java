package com.inventitrack.controller;

import com.inventitrack.model.Produto;
import com.inventitrack.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*") // Para não dar erro no JS local
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @PostMapping
    public String salvar(@RequestBody Produto produto) throws Exception { return service.salvar(produto); }

    @GetMapping
    public List<Produto> listar() throws Exception { return service.listar(); }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable String id) throws Exception { service.deletar(id); }

    @PostMapping("/{id}/estoque")
    public void adicionarEstoque(@PathVariable String id, @RequestParam int qtd) throws Exception {
        service.adicionarEstoque(id, qtd);
    }
}