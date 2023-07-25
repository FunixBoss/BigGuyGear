package com.project.api.repositories;

import com.project.api.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "notifications", path="notifications")
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
