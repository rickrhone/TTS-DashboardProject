package com.tts.ttsdashboardproject.controllers;

import com.tts.ttsdashboardproject.dao.entities.Categories;
import com.tts.ttsdashboardproject.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController // communicates that this is a REST controller
public class CategoriesController {
    @Autowired
    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }


    // Endpoint to Get All Categories
    @GetMapping("/categories")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<List<Categories>> findAll() {
        return ResponseEntity.ok(categoriesService.findAll());
    }

    // Pageable Categories
    @GetMapping("/categoriesByPage")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public Page<Categories> findAllpages( @RequestParam Optional<Integer> pageNum,
                                          @RequestParam Optional<Integer> numCatPerPage,
                                          @RequestParam Optional<String> sortBy) {
        return categoriesService.findAllPages(pageNum,numCatPerPage,sortBy);
    }

    // Endpoint to GET a specific category by ID
    @GetMapping("/categoriesByPage/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<Categories> findAllpages( @PathVariable Long id) {
        Optional<Categories> category = categoriesService.findById(id);
        if (!category.isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(category.get());
    }


    // Endpoint to CREATE a new category
    @PostMapping("/postcategory")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity create( @Valid @RequestBody Categories category) {
        return ResponseEntity.ok(categoriesService.save(category));
    }

    // Endpoint to GET a specific category by ID
//    @GetMapping("/categories/{id}")
//    //TODO : change origin link after hosting front end on Github
//    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
//    public ResponseEntity<Categories> findById(@PathVariable Long id) {
//        Optional<Categories> category = categoriesService.findById(id);
//        if (!category.isPresent()) {
//            System.out.println("Id " + id + " does not exist");
//            ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok(category.get());
//    }

    // Endpoint to UPDATE a category by ID
    @PutMapping("/putcategories/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<Categories> update(@PathVariable Long id, @Valid @RequestBody Categories category) {
        if (!categoriesService.findById(id).isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(categoriesService.save(category));
    }

    // Endpoint to DELETE a category by ID
    @DeleteMapping("/deletecategories/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity delete(@PathVariable Long id) {
        if (!categoriesService.findById(id).isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        categoriesService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
