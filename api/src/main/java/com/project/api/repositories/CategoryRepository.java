package com.project.api.repositories;

import com.project.api.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "categories", path="categories")
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
