package com.project.api.services.impl;

import com.project.api.dtos.AddressDTO;
import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.repositories.AddressRepository;
import com.project.api.repositories.CategoryRepository;
import com.project.api.repositories.ProductRepository;
import com.project.api.services.AddressService;
import com.project.api.services.CategoryService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<AddressDTO> findByAccountId(Integer accountId) {
        try {
            return this.addressRepository.findAddressesByAccountId(accountId).stream()
                    .map(AddressDTO::new).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
