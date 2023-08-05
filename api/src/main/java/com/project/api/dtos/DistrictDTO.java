package com.project.api.dtos;

import com.project.api.entities.District;
import com.project.api.entities.Ward;
import lombok.Data;

@Data
public class DistrictDTO {
    private String code;
    private String fullName;

    public DistrictDTO() {}
    public DistrictDTO(District district) {
        this.code = district.getCode();
        this.fullName = district.getFullName();
    }
}
