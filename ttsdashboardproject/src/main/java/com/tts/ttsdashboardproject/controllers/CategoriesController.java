package com.tts.ttsdashboardproject.controllers;


import com.tts.ttsdashboardproject.dao.entities.Categories;
import com.tts.ttsdashboardproject.dao.repositories.CategoriesRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController // communicates that this is a REST controller
public class CategoriesController {
    private CategoriesRepository categoriesRepository; // declares the repo to be controlled

    public CategoriesController(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository; // assigns that repo to an instance of categories repository
    }

    // Endpoint to Retrieve All Categories
    @GetMapping("/categories")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public Collection<Categories> listOfAllCategories() {
        return categoriesRepository.findAll().stream().collect(Collectors.toList()); // displays JASON data for everything in the table at the /categories endpoint
    }

}
