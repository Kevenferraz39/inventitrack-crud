package com.inventitrack.repository;


import com.google.api.core.ApiFuture;

import org.springframework.stereotype.Repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

@Repository
public class BaseRepository {

    public <T> String salvar(String colecao, String id, T objeto) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(colecao).document(id).set(objeto).get();
        return id;
    }

    public <T> List<T> listar(String colecao, Class<T> tipo) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        List<T> lista = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = db.collection(colecao).get();
        for (DocumentSnapshot doc : future.get().getDocuments()) {
            lista.add(doc.toObject(tipo));
        }
        return lista;
    }
}