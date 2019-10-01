package com.tts.ttsdashboardproject.controllers;


import com.tts.ttsdashboardproject.dao.entities.Categories;
import com.tts.ttsdashboardproject.dao.entities.Suppliers;
import com.tts.ttsdashboardproject.services.SuppliersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController // communicates that this is a REST controller
public class SuppliersController {
    @Autowired
    private final SuppliersService suppliersService;

    public SuppliersController(SuppliersService suppliersService) {
        this.suppliersService = suppliersService;
    }

    // Endpoint to Get All Suppliers
    @GetMapping("/suppliers")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<List<Suppliers>> findAll() {
        return ResponseEntity.ok(suppliersService.findAll());
    }

    // Pageable Suppliers
    @GetMapping("/suppliersByPage")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public Page<Suppliers> findAllpages(@RequestParam (defaultValue = "0", required = false) int pageNum,
                                         @RequestParam (defaultValue = "20", required = false) int numSupPerPage,
                                         @RequestParam (defaultValue = "ASC", required = false) String direction,
                                         @RequestParam (defaultValue = "supplierId", required = false) String sortBy) {
        return suppliersService.findAllPages(pageNum,numSupPerPage,direction,sortBy);
    }

    // Endpoint to GET a specific supplier by ID
    @GetMapping("/suppliersByPage/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<Suppliers> findAllpages(@PathVariable Long id) {
        Optional<Suppliers> supplier = suppliersService.findById(id);
        if (!supplier.isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(supplier.get());
    }

    // Endpoint to CREATE a new Supplier
    @PostMapping("/postsupplier")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity create( @Valid @RequestBody Suppliers supplier) {
        return ResponseEntity.ok(suppliersService.save(supplier));
    }


    // Endpoint to UPDATE a supplier by ID
    @PutMapping("/putsupplier/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity<Suppliers> update(@PathVariable Long id, @Valid @RequestBody Suppliers supplier) {
        if (!suppliersService.findById(id).isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(suppliersService.save(supplier));
    }

    // Endpoint to DELETE a supplier by ID
    @DeleteMapping("/deletesupplier/{id}")
    //TODO : change origin link after hosting front end on Github
    @CrossOrigin(origins = "http://localhost:4200") //points the front end / presentation layer where the data will be displayed
    public ResponseEntity delete(@PathVariable Long id) {
        if (!suppliersService.findById(id).isPresent()) {
            System.out.println("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }
        suppliersService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
