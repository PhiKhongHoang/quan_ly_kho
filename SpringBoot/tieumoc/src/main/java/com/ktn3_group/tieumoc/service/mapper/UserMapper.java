package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.User;
import com.ktn3_group.tieumoc.model.request.user.ReqCreateUserDTO;
import com.ktn3_group.tieumoc.model.request.user.ReqUpdateUserDTO;
import com.ktn3_group.tieumoc.model.response.user.ResUpdateUserDTO;
import com.ktn3_group.tieumoc.model.response.user.ResCreateUserDTO;
import com.ktn3_group.tieumoc.model.response.user.ResUserDTO;
import org.springframework.stereotype.Component;

@Component  // Thêm dòng này để Spring nhận diện lớp như một bean
public class UserMapper {
    public final ResUserDTO convertToResUserDTO(User user) {
        ResUserDTO res = new ResUserDTO();
        ResUserDTO.RoleUser roleUser = new ResUserDTO.RoleUser();

        if (user.getRole() != null) {
            roleUser.setId(user.getRole().getId());
            roleUser.setName(user.getRole().getName());
            res.setRole(roleUser);
        }

        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setName(user.getName());
        res.setActive(user.isActive());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setCreatedAt(user.getCreatedAt());
        res.setCreatedBy(user.getCreatedBy());
        res.setUpdatedBy(user.getUpdatedBy());

        return res;
    }

    public ResCreateUserDTO convertToResCreateUserDTO(User user) {
        ResCreateUserDTO res = new ResCreateUserDTO();

        res.setId(user.getId());
        res.setName(user.getName());
        res.setActive(user.isActive());
        res.setCreatedAt(user.getCreatedAt());
        res.setCreatedBy(user.getCreatedBy());

        return res;
    }

    public ResUpdateUserDTO convertToResUpdateUserDTO(User user) {
        ResUpdateUserDTO res = new ResUpdateUserDTO();

        res.setId(user.getId());
        res.setName(user.getName());
        res.setActive(user.isActive());
        res.setCreatedAt(user.getCreatedAt());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setCreatedBy(user.getCreatedBy());
        res.setUpdatedBy(user.getUpdatedBy());

        return res;
    }

    public User convertFromReqCreateUserDTO(ReqCreateUserDTO request) {
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setActive(true);
        user.setRole(request.getRole());

        return user;
    }

    public User convertFromReqUpdateUserDTO(ReqUpdateUserDTO request) {
        User user = new User();

        user.setId(request.getId());
        user.setName(request.getName());
        user.setActive(request.isActive());
        user.setRole(request.getRole());

        return user;
    }

}
