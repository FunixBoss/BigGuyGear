package com.project.api.repositories;

import com.project.api.entities.ProductVariant;
import com.project.api.entities.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "provinces", path="provinces")
public interface ProvinceRepository extends JpaRepository<Province, String> {
}
