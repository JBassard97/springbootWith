package com.example.model;

public class MessageResponse {
    private String message;
    private Long id;

    public MessageResponse(String message, Long id) {
        this.message = message;
        this.id = id;
    }

    public MessageResponse(String message) {
        this.message = message;
        this.id = null;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // A method to check if id is set
    public boolean hasId() {
        return id != null;
    }
}
