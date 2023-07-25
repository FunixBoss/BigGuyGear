package com.project.api.repositories;

import com.project.api.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "address", path="address")
public interface AddressRepository extends JpaRepository<Address, Integer> {
}
