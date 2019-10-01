package com.tts.ttsdashboardproject.services;

import com.tts.ttsdashboardproject.dao.entities.Products;
import com.tts.ttsdashboardproject.dao.repositories.ProductsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {
    private final ProductsRepository productsRepository; // allows only one instance of the products repository

    public ProductsService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    // Find All method - returns a list of everything
    public List<Products> findAll() {
        return productsRepository.findAll();
    }

    // Find All method - returns a list of everything --PAGINATION
    public Page<Products> findAllPages(int pageNum,
                                         int numProdPerPage,
                                         String direction,
                                         String sortBy) {
        Pageable page = PageRequest.of(pageNum,
                numProdPerPage, Sort.Direction.fromString(direction), sortBy);
        return productsRepository.findAll(page);
    }
    // Find by ID method
    public Optional<Products> findById(Long id) {
        return productsRepository.findById(id);
    }

    // Method to SAVE a new product to the products Repo
    public Products save(Products product) {
        return productsRepository.save(product);
    }

    // Method to DELETE a product from the products Repo
    public void deleteById(Long id) {
        productsRepository.deleteById(id);
    }

}
