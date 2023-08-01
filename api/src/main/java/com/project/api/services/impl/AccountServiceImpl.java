package com.project.api.services.impl;

import com.project.api.dtos.AccountDTO;
import com.project.api.dtos.AddressDTO;
import com.project.api.entities.Account;
import com.project.api.repositories.AccountRepository;
import com.project.api.repositories.RoleRepository;
import com.project.api.services.AccountService;
import com.project.api.services.AddressService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;



    @Autowired
    private ImageUploadUtils imageUploadUtils;

    @Override
    public List<AccountDTO> findAll() {
        try {
            List<Account> accounts = accountRepository.findAll();
            return accounts.stream().map(AccountDTO::new).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public Account create(Account account) {
        try {
            String imgFileName = imageUploadUtils.uploadImgBase64("account", account.getImage());
            account.getImage().setImageUrl(imgFileName);
            account.setRole(roleRepository.findById(2).get());
            account.setCreatedAt(new Date());
            account.setUpdatedAt(new Date());
            return accountRepository.save(account);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean update(Account account) {
        try {
            Account oldAccount = accountRepository.findById(account.getId()).get();

            if(!account.getImage().getImageUrl().startsWith("http://")) {
                if(oldAccount.getImage() != null) {
                    imageUploadUtils.delete("account", oldAccount.getImage().getImageUrl());
                }
                String imgFileName = imageUploadUtils.uploadImgBase64("account", account.getImage());
                account.getImage().setImageUrl(imgFileName);
            } else {
//              did not upload new img
                if(oldAccount.getImage() != null) {
                    account.setImage(oldAccount.getImage());
                }
            }
//            does not change password
            if(account.getPassword() == null) {
                account.setPassword(oldAccount.getPassword());
            } else {
//                hash password
            }
            account.setCreatedAt(oldAccount.getCreatedAt());
            account.setUpdatedAt(new Date());
            account.setRole(oldAccount.getRole());
            this.accountRepository.save(account);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateActive(List<Account> accounts, Boolean active) {
        try {
            accounts.forEach(account -> {
                Account oldAccount = this.accountRepository.findById(account.getId()).get();
                oldAccount.setActive(active);
                this.accountRepository.save(oldAccount);
            });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteById(Integer id) {
        try {
            Account account = this.accountRepository.findById(id).get();
            this.imageUploadUtils.delete("account", account.getImage().getImageUrl());
            this.accountRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean checkEmailExisting(String email) {
        try {
            return accountRepository.existsByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<AccountDTO> findByEmailKeyword(String keyword) {
        try {
            return accountRepository.findByEmailStartingWith(keyword).stream()
                        .map(AccountDTO::new).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
