package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.User;
import com.ktn3_group.tieumoc.model.response.user.ResUserDTO;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.repository.UserRepo;
import com.ktn3_group.tieumoc.service.mapper.UserMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserService(UserRepo userRepo, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean isUserActive(String email) {
        return userRepo.existsByEmailAndActiveTrue(email);
    }

    public User handleCreateUser(User request) {
        return userRepo.save(request);
    }

    public User handleFetchUserById(long id) {
        Optional<User> userOptional = this.userRepo.findById(id);
        return userOptional.orElse(null);
    }

    public ResultPaginationDTO handleFetchAllUser(Specification<User> spec,
                                                  Pageable pageable) {
        Page<User> pageUser = this.userRepo.findAll(spec, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pageUser.getTotalPages());
        mt.setTotal(pageUser.getTotalElements());

        rs.setMeta(mt);

        // remove sensitive data
        List<ResUserDTO> listUser = pageUser.getContent()
                .stream().map(userMapper::convertToResUserDTO)
                .collect(Collectors.toList());

        rs.setResult(listUser);

        return rs;
    }

    public List<ResUserDTO> handleFetchAllUser() {
        List<User> users = this.userRepo.findAll();

        // remove sensitive data
        List<ResUserDTO> listUser = users
                .stream().map(userMapper::convertToResUserDTO)
                .collect(Collectors.toList());

        return listUser;
    }

    public User handleUpdateUser(User request) {
        User currentUser = handleFetchUserById(request.getId());

        if (currentUser != null) {
            currentUser.setName(request.getName());
            currentUser.setActive(request.isActive());
            currentUser.setRole(request.getRole());

            // update
            currentUser = this.userRepo.save(currentUser);
        }

        return currentUser;
    }

    public void handleDeleteUser(long id) {
        this.userRepo.deleteById(id);
    }

    public User handleGetUserByUsername(String username) {
        return userRepo.findByEmail(username);
    }

    public void updateUserToken(String token, String email) {
        User currentUser = this.handleGetUserByUsername(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(token);
            userRepo.save(currentUser);
        }
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return userRepo.findByRefreshTokenAndEmail(token, email);
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }


    public User changePassword(String email, String password) {
        User currentUser = userRepo.findByEmail(email);

        if (currentUser != null) {
            currentUser.setPassword(password);

            // update
            currentUser = this.userRepo.save(currentUser);
        }

        return currentUser;
    }

}
