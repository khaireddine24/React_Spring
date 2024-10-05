package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin loginAdmin) {
        Admin admin = adminRepository.findByEmail(loginAdmin.getEmail())
                .orElse(null);

        if (admin != null && admin.getPassword().equals(loginAdmin.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(response);
        }
    }

    /* Optional Function just for test */
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }
        
        Admin savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

}
