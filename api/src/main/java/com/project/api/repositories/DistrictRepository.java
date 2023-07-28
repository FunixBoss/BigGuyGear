package com.project.api.repositories;

import com.project.api.entities.District;
import com.project.api.entities.projection.CouponProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "districts", path="districts")
public interface DistrictRepository extends JpaRepository<District, String> {
}
