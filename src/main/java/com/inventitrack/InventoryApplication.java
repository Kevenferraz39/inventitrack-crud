package com.inventitrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class InventoryApplication {
    public static void main(String[] args) {
        SpringApplication.run(InventoryApplication.class, args);
    }

    // Este método roda automaticamente assim que o servidor termina de ligar
    @EventListener(ApplicationReadyEvent.class)
    public void exibirLinkNoTerminal() {
        System.out.println("\n=========================================================");
        System.out.println("🚀 SERVIDOR PRONTO! CLIQUE NO LINK ABAIXO PARA ACESSAR:");
        System.out.println("👉 http://localhost:3000 👈"); // Mude para 8080 se não tiver alterado no properties
        System.out.println("=========================================================\n");
    }
}