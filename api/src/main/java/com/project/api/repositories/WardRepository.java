package com.project.api.repositories;

import com.project.api.entities.Role;
import com.project.api.entities.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "wards", path="wards")
public interface WardRepository extends JpaRepository<Ward, String> {
}
