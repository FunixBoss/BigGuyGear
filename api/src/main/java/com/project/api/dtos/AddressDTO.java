package com.project.api.dtos;


import com.project.api.entities.Address;
import lombok.Data;

@Data
public class AddressDTO {
    private String roadName;
    private WardDTO ward;
    private DistrictDTO district;
    private ProvinceDTO province;

    public AddressDTO(Address address) {
        this.roadName = address.getRoadName();
        this.ward = new WardDTO(address.getWard());
        this.district = new DistrictDTO(address.getDistrict());
        this.province = new ProvinceDTO(address.getProvince());
    }
}
