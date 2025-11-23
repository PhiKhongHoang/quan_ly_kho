package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.Follow;
import com.ktn3_group.tieumoc.model.Product;
import com.ktn3_group.tieumoc.repository.FollowRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowService {
    private final FollowRepo followRepo;

    public FollowService(FollowRepo followRepo) {
        this.followRepo = followRepo;
    }

    public Follow handleCreateFollow(Follow request) {
        return followRepo.save(request);
    }

    public Follow findByProductAndCreatedBy(Product product, String createdBy) {
        return followRepo.findByProductAndCreatedBy(product, createdBy).orElse(null);
    }

}
