package com.project.api.dtos;

import com.project.api.entities.Ward;
import lombok.Data;

@Data
public class WardDTO {
    private String code;
    private String fullName;

    public WardDTO () {}
    public WardDTO(Ward ward) {
        this.code = ward.getCode();
        this.fullName = ward.getFullName();
    }
}
