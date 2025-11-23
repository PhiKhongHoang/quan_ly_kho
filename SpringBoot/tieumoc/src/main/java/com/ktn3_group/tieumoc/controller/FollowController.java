package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.Follow;
import com.ktn3_group.tieumoc.service.FollowService;
import com.ktn3_group.tieumoc.service.ProductService;
import com.ktn3_group.tieumoc.util.SecurityUtil;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/follows")
public class FollowController {
    private final FollowService followService;
    private final ProductService productService;

    public FollowController(FollowService followService,
                            ProductService productService) {
        this.followService = followService;
        this.productService = productService;
    }

    @PostMapping("")
    @ApiMessage("Create or update a new follow")
    public ResponseEntity<Follow> createOrUpdateFollow(@RequestBody Follow request) {
        String createdBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        Follow result = followService.findByProductAndCreatedBy(request.getProduct(), createdBy);

        if (result == null) {
            Follow follow = new Follow();

            follow.setFollow(1);
            follow.setProduct(productService.handleFetchProductById(request.getProduct().getId()));

            followService.handleCreateFollow(follow);
        } else {
            result.setFollow(result.getFollow() + 1);

            followService.handleCreateFollow(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(result);
    }

}
