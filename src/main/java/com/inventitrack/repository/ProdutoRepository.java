package com.inventitrack.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.inventitrack.model.Produto;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class ProdutoRepository {

    private static final String COLLECTION = "produtos";

    public String salvar(Produto produto) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        if (produto.getId() == null || produto.getId().isEmpty()) {
            DocumentReference docRef = db.collection(COLLECTION).document();
            produto.setId(docRef.getId());
        }
        db.collection(COLLECTION).document(produto.getId()).set(produto).get();
        return produto.getId();
    }

    public List<Produto> listarTodos() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        List<Produto> produtos = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION).get();
        for (DocumentSnapshot document : future.get().getDocuments()) {
            produtos.add(document.toObject(Produto.class));
        }
        return produtos;
    }

    public void deletar(String id) throws ExecutionException, InterruptedException {
        FirestoreClient.getFirestore().collection(COLLECTION).document(id).delete().get();
    }

    // ⚡ EXEMPLO DE TRANSAÇÃO: Atualizar estoque de forma segura
    public void atualizarEstoqueSeguro(String produtoId, int quantidadeAdicional) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION).document(produtoId);

        ApiFuture<Void> transaction = db.runTransaction(t -> {
            DocumentSnapshot snapshot = t.get(docRef).get();
            if (snapshot.exists()) {
                Long qtdAtual = snapshot.getLong("quantidade");
                long novaQtd = (qtdAtual != null ? qtdAtual : 0) + quantidadeAdicional;
                t.update(docRef, "quantidade", novaQtd);
            } else {
                throw new Exception("Produto não encontrado");
            }
            return null;
        });
        transaction.get();
    }
}