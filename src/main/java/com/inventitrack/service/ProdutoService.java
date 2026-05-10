package com.inventitrack.service;

import com.inventitrack.model.Produto;
import com.inventitrack.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public String salvar(Produto produto) throws Exception { return repository.salvar(produto); }
    public List<Produto> listar() throws Exception { return repository.listarTodos(); }
    public void deletar(String id) throws Exception { repository.deletar(id); }
    public void adicionarEstoque(String id, int qtd) throws Exception { repository.atualizarEstoqueSeguro(id, qtd); }
}