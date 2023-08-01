package com.project.api.dtos;

import com.project.api.entities.Account;
import com.project.api.entities.Category;
import com.project.api.entities.Image;
import com.project.api.entities.Role;
import lombok.Data;

import java.util.Date;

@Data
public class AccountDTO {
    private Integer id;
    private String email;
    private String phoneNumber;
    private String fullName;
    private Boolean active;
    private Date createdAt;
    private Integer totalOrders;
    private ImageDTO image;
    private RoleDTO role;

    public AccountDTO(Account account) {
        this.id = account.getId();
        this.email = account.getEmail();
        this.phoneNumber = account.getPhoneNumber();
        this.fullName = account.getFullName();
        this.active = account.getActive();
        this.createdAt = account.getCreatedAt();
        this.totalOrders = account.getOrders().size();
        if(account.getImage() != null) {
            this.image = new ImageDTO(account.getImage());
        }

        if(account.getRole() != null) {
            this.role = new RoleDTO(account.getRole());
        }
    }

}