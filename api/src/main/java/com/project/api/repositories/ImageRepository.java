package com.project.api.repositories;

import com.project.api.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "images", path="images")
public interface ImageRepository extends JpaRepository<Image, Integer> {
}
