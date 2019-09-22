package com.tts.ttsdashboardproject.dao.repositories;

import com.tts.ttsdashboardproject.dao.entities.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource // directs spring MVC to create RESTful endpoints
//TODO : change origin link after hosting front end on Github
@CrossOrigin(origins = "http://localhost:4200") // allows for communication with the endpoints when adding/deleting/editing
public interface CategoriesRepository extends JpaRepository<Categories, Long> {
}
