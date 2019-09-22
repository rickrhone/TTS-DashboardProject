package com.tts.ttsdashboardproject.controllers;

import com.tts.ttsdashboardproject.dao.entities.Products;
import com.tts.ttsdashboardproject.dao.repositories.ProductsRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController // communicates that this is a REST controller
public class ProductsController {
    private ProductsRepository productsRepository; // declares the repo to be controlled

    public ProductsController(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository; // assigns that repo to an instance of products repository
    }

    // Endpoint to Retrieve All Products
    @GetMapping("/products")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") // points the front end / presentation layer where the data will be displayed
    public Collection<Products> listOfAllProducts() {
        return productsRepository.findAll().stream().collect(Collectors.toList()); // displays JASON data for everything in the table at the /products endpoint
    }

}
