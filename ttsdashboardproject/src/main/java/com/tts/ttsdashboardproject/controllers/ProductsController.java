package com.tts.ttsdashboardproject.controllers;

import com.tts.ttsdashboardproject.dao.entities.Products;
import com.tts.ttsdashboardproject.services.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController // communicates that this is a REST controller
public class ProductsController {
    @Autowired
    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService= productsService;
    }

    // Endpoint to Get All Products
    @GetMapping("/products")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<List<Products>> findAll() {
        return ResponseEntity.ok(productsService.findAll());
    }

    // Pageable Products
    @GetMapping("/productsByPage")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public Page<Products> findAllpages(@RequestParam (defaultValue = "0", required = false) int pageNum,
                                         @RequestParam (defaultValue = "50", required = false) int numProdPerPage,
                                         @RequestParam (defaultValue = "ASC", required = false) String direction,
                                         @RequestParam (defaultValue = "productId", required = false) String sortBy) {
        return productsService.findAllPages(pageNum,numProdPerPage,direction,sortBy);
    }

    // Endpoint to GET a specific product by ID
    @GetMapping("/productsByPage/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<Products> findAllpages(@PathVariable Long id) {
        Optional<Products> product = productsService.findById(id);
        if (!product.isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(product.get());
    }

    // Endpoint to CREATE a new product
    @PostMapping("/postproduct")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity create( @Valid @RequestBody Products product) {
        return ResponseEntity.ok(productsService.save(product));
    }

    // Endpoint to GET a specific product by ID
//    @GetMapping("/products/{id}")
//    //TODO : change origin link after hosting front end on Github
//    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
//    public ResponseEntity<Products> findById(@PathVariable Long id) {
//        Optional<Products> product = productsService.findById(id);
//        if (!product.isPresent()) {
//            System.out.println("Id " + id + " does not exist");
//            ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok(product.get());
//    }

    // Endpoint to UPDATE a product by ID
    @PutMapping("/putproduct/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<Products> update(@PathVariable Long id, @Valid @RequestBody Products product) {
        if (!productsService.findById(id).isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(productsService.save(product));
    }

    // Endpoint to DELETE a product by ID
    @DeleteMapping("/deleteproduct/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity delete(@PathVariable Long id) {
        if (!productsService.findById(id).isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        productsService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
