package com.tts.ttsdashboardproject.controllers;

import com.tts.ttsdashboardproject.dao.entities.Suppliers;
import com.tts.ttsdashboardproject.dao.repositories.SuppliersRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController // communicates that this is a REST controller
public class SuppliersController {
    private SuppliersRepository suppliersRepository; // declares the repo to be controlled

    public SuppliersController(SuppliersRepository suppliersRepository) {
        this.suppliersRepository = suppliersRepository; // assigns that repo to an instance of suppliers repository
    }

    // Endpoint to Retrieve All Suppliers
    @GetMapping("/suppliers")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public Collection<Suppliers> listOfAllSuppliers() {
        return suppliersRepository.findAll().stream().collect(Collectors.toList()); // displays JASON data for everything in the table at the /suppliers endpoint
    }










}
