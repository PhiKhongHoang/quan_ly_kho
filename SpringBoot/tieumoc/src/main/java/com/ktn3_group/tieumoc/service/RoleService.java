package com.ktn3_group.tieumoc.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ktn3_group.tieumoc.model.Permission;
import com.ktn3_group.tieumoc.model.Role;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.repository.PermissionRepo;
import com.ktn3_group.tieumoc.repository.RoleRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleRepo roleRepo;
    private final PermissionRepo permissionRepo;

    public RoleService(
            RoleRepo roleRepo,
            PermissionRepo permissionRepo) {
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
    }

    public boolean existByName(String name) {
        return this.roleRepo.existsByName(name);
    }

    public Role create(Role r) {
        // check permissions
        if (r.getPermissions() != null) {
            List<Long> reqPermissions = r.getPermissions()
                    .stream().map(x -> x.getId())
                    .collect(Collectors.toList());

            List<Permission> dbPermissions = this.permissionRepo.findByIdIn(reqPermissions);
            r.setPermissions(dbPermissions);
        }

        return this.roleRepo.save(r);
    }

    public Role fetchById(long id) {
        Optional<Role> roleOptional = this.roleRepo.findById(id);
        if (roleOptional.isPresent())
            return roleOptional.get();
        return null;
    }

    public Role update(Role r) {
        Role roleDB = this.fetchById(r.getId());
        // check permissions
        if (r.getPermissions() != null) {
            List<Long> reqPermissions = r.getPermissions()
                    .stream().map(x -> x.getId())
                    .collect(Collectors.toList());

            List<Permission> dbPermissions = this.permissionRepo.findByIdIn(reqPermissions);
            r.setPermissions(dbPermissions);
        }

        roleDB.setName(r.getName());
        roleDB.setDescription(r.getDescription());
        roleDB.setActive(r.isActive());
        roleDB.setPermissions(r.getPermissions());
        roleDB = this.roleRepo.save(roleDB);
        return roleDB;
    }

    public void delete(long id) {
        this.roleRepo.deleteById(id);
    }

    public ResultPaginationDTO getRoles(Specification<Role> spec, Pageable pageable) {
        Page<Role> pRole = this.roleRepo.findAll(spec, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pRole.getTotalPages());
        mt.setTotal(pRole.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(pRole.getContent());
        return rs;
    }

    public List<Role> getRoles() {
        List<Role> roles = this.roleRepo.findAll();
        return roles;
    }
}

