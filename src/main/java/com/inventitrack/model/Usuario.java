package com.inventitrack.model;

public class Usuario {
    private String id;
    private String name;
    private String badge;
    private String role;
    private String sector;
    private String shift;
    private boolean active;

    public Usuario() {}

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public String getShift() { return shift; }
    public void setShift(String shift) { this.shift = shift; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}