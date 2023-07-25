package com.project.api.repositories;

import com.project.api.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "accounts", path="accounts")
public interface AccountRepository extends JpaRepository<Account, Integer> {
}
