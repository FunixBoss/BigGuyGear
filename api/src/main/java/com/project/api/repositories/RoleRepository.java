package com.project.api.repositories;

import com.project.api.entities.Province;
import com.project.api.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "roles", path="roles")
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
