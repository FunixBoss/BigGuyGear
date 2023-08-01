package com.project.api.services;

import com.project.api.dtos.AddressDTO;

import java.util.List;

public interface AddressService {
    List<AddressDTO> findByAccountId(Integer accountId);
}
