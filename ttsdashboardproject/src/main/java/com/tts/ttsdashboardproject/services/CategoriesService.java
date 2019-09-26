package com.tts.ttsdashboardproject.services;


import com.tts.ttsdashboardproject.dao.entities.Categories;
import com.tts.ttsdashboardproject.dao.repositories.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class CategoriesService {
    private final CategoriesRepository categoriesRepository; // allows only one instance of the categories repository

    public CategoriesService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    // Find All method - returns a list of everything
    public List<Categories> findAll() {
        return categoriesRepository.findAll();
    }

    // Find by ID method
    public Optional<Categories> findById(Long id) {
        return categoriesRepository.findById(id);
    }

    // Method to SAVE a new category to the categories Repo
    public Categories save(Categories category) {
        return categoriesRepository.save(category);
    }

    // Method to DELETE a category from the categories Repo
    public void deleteById(Long id) {
        categoriesRepository.deleteById(id);
    }
}
