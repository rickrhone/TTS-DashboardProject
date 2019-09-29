package com.tts.ttsdashboardproject.services;

import com.tts.ttsdashboardproject.dao.entities.Products;
import com.tts.ttsdashboardproject.dao.entities.Suppliers;
import com.tts.ttsdashboardproject.dao.repositories.ProductsRepository;
import com.tts.ttsdashboardproject.dao.repositories.SuppliersRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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
    public Page<Products> findAllPages(@RequestParam Optional<Integer> pageNum,
                                        @RequestParam Optional<Integer> numProdPerPage,
                                        @RequestParam Optional<String> sortBy) {
        return productsRepository.findAll(PageRequest.of(pageNum.orElse(0),
                numProdPerPage.orElse(60),
                Sort.by(sortBy.orElse("productId")).ascending()));
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
