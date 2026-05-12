package com.inventitrack.model;

public class Produto {
    private String id;
    private String sku;
    private String name;
    private String cat;
    private int stock;
    private int min;
    private String location;
    private double price;
    private String lastIn;

    public Produto() {}

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCat() { return cat; }
    public void setCat(String cat) { this.cat = cat; }
    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }
    public int getMin() { return min; }
    public void setMin(int min) { this.min = min; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getLastIn() { return lastIn; }
    public void setLastIn(String lastIn) { this.lastIn = lastIn; }
}