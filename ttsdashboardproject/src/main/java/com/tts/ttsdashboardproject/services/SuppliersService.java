package com.tts.ttsdashboardproject.services;

import com.tts.ttsdashboardproject.dao.entities.Suppliers;
import com.tts.ttsdashboardproject.dao.repositories.SuppliersRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuppliersService {
    private final SuppliersRepository suppliersRepository; // allows only one instance of the suppliers repository

    public SuppliersService(SuppliersRepository suppliersRepository) {
        this.suppliersRepository = suppliersRepository;
    }

    // Find All method - returns a list of everything
    public List<Suppliers> findAll() {
        return suppliersRepository.findAll();
    }

    // Find All method - returns a list of everything --PAGINATION
    public Page<Suppliers> findAllPages(int pageNum,
                                         int numSupPerPage,
                                         String direction,
                                         String sortBy) {
        Pageable page = PageRequest.of(pageNum,
                numSupPerPage, Sort.Direction.fromString(direction), sortBy);
        return suppliersRepository.findAll(page);
    }


    // Find by ID method
    public Optional<Suppliers> findById(Long id) {
        return suppliersRepository.findById(id);
    }

    // Method to SAVE a new supplier to the suppliers Repo
    public Suppliers save(Suppliers supplier) {
        return suppliersRepository.save(supplier);
    }

    // Method to DELETE a supplier from the suppliers Repo
    public void deleteById(Long id) {
        suppliersRepository.deleteById(id);
    }

}
