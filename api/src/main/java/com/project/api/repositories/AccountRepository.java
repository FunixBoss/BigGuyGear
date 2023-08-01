package com.project.api.repositories;

import com.project.api.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "accounts", path="accounts")
@CrossOrigin("http://localhost:4200")
public interface AccountRepository extends JpaRepository<Account, Integer> {
    boolean existsByEmail(String email);

    List<Account> findByEmailStartingWith(String keyword);

}
