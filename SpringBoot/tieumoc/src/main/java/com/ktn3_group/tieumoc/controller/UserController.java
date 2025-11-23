package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.User;
import com.ktn3_group.tieumoc.model.request.user.ReqCreateUserDTO;
import com.ktn3_group.tieumoc.model.request.user.ReqUpdateUserDTO;
import com.ktn3_group.tieumoc.model.response.user.ResUpdateUserDTO;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.user.ResCreateUserDTO;
import com.ktn3_group.tieumoc.model.response.user.ResUserDTO;
import com.ktn3_group.tieumoc.repository.UserRepo;
import com.ktn3_group.tieumoc.service.UserService;
import com.ktn3_group.tieumoc.service.mapper.UserMapper;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("")
    @ApiMessage("Create a new user")
    public ResponseEntity<ResCreateUserDTO> createNewUser(
            @Valid @RequestBody ReqCreateUserDTO request) throws IdInvalidException {
        boolean isEmailExist = userService.existsByEmail(request.getEmail());
        if (isEmailExist) {
            throw new IdInvalidException(
                    "Email " + request.getEmail() + " đã tồn tại. Vui lòng chọn một email khác!");
        }

        User user = userMapper.convertFromReqCreateUserDTO(request);

        String hashPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashPassword);

        user = userService.handleCreateUser(user);

        ResCreateUserDTO result = userMapper.convertToResCreateUserDTO(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(result);
    }

    @GetMapping("/{id}")
    @ApiMessage("Fetch user by id")
    public ResponseEntity<ResUserDTO> getUserById(@PathVariable("id") long id)
            throws IdInvalidException {
        User result = userService.handleFetchUserById(id);
        if (result == null) {
            throw new IdInvalidException("User với id = " + id + " không tồn tại!");
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(userMapper.convertToResUserDTO(result));
    }

    @GetMapping("/email/{email}")
    @ApiMessage("Fetch user by email")
    public ResponseEntity<ResUserDTO> getUserById(@PathVariable("email") String email)
            throws IdInvalidException {
        User result = userService.findByEmail(email);
        if (result == null) {
            throw new IdInvalidException("User với email = " + email + " không tồn tại!");
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(userMapper.convertToResUserDTO(result));
    }

    @GetMapping("/pagination")
    @ApiMessage("fetch all users")
    public ResponseEntity<ResultPaginationDTO> getAllUser(
            @Filter Specification<User> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                userService.handleFetchAllUser(spec, pageable));
    }

    @GetMapping("")
    @ApiMessage("fetch all users")
    public ResponseEntity<List<ResUserDTO>> getAllUser() {

        return ResponseEntity.status(HttpStatus.OK).body(
                userService.handleFetchAllUser());
    }

    @PutMapping("")
    @ApiMessage("Update a user")
    public ResponseEntity<ResUpdateUserDTO> updateUser(@RequestBody ReqUpdateUserDTO request)
            throws IdInvalidException {
        User user = userMapper.convertFromReqUpdateUserDTO(request);

        User currentUser = userService.handleUpdateUser(user);
        if (currentUser == null) {
            throw new IdInvalidException("User với id = " + request.getId() + " không tồn tại!");
        }

        ResUpdateUserDTO result = userMapper.convertToResUpdateUserDTO(currentUser);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a user")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") long id)
            throws IdInvalidException {
        User currentUser = userService.handleFetchUserById(id);
        if (currentUser == null) {
            throw new IdInvalidException("User với id = " + id + " không tồn tại!");
        }

        userService.handleDeleteUser(id);
        return ResponseEntity.ok(null);
    }


}
