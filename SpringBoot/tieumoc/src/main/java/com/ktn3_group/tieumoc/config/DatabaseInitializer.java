package com.ktn3_group.tieumoc.config;


import java.util.ArrayList;
import java.util.List;

import com.ktn3_group.tieumoc.model.Permission;
import com.ktn3_group.tieumoc.model.Role;
import com.ktn3_group.tieumoc.model.User;
import com.ktn3_group.tieumoc.repository.PermissionRepo;
import com.ktn3_group.tieumoc.repository.RoleRepo;
import com.ktn3_group.tieumoc.repository.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DatabaseInitializer implements CommandLineRunner {

    private final PermissionRepo permissionRepo;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public DatabaseInitializer(
            PermissionRepo permissionRepo,
            RoleRepo roleRepo,
            UserRepo userRepo,
            PasswordEncoder passwordEncoder) {
        this.permissionRepo = permissionRepo;
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(">>> START INIT DATABASE");
        long countPermissions = this.permissionRepo.count();
        long countRoles = this.roleRepo.count();
        long countUsers = this.userRepo.count();

        if (countPermissions == 0) {
            ArrayList<Permission> arr = new ArrayList<>();
            arr.add(new Permission("Tạo mới permission", "/api/v1/permissions", "POST", "PERMISSIONS"));
            arr.add(new Permission("Chỉnh sửa permission", "/api/v1/permissions", "PUT", "PERMISSIONS"));
            arr.add(new Permission("Xóa permission theo id", "/api/v1/permissions/{id}", "DELETE", "PERMISSIONS"));
            arr.add(new Permission("Lấy permission theo id", "/api/v1/permissions/{id}", "GET", "PERMISSIONS"));
            arr.add(new Permission("Lấy tất cả permissions", "/api/v1/permissions", "GET", "PERMISSIONS"));

            arr.add(new Permission("Tạo mới role", "/api/v1/roles", "POST", "ROLES"));
            arr.add(new Permission("Chỉnh sửa role", "/api/v1/roles", "PUT", "ROLES"));
            arr.add(new Permission("Xóa role theo id", "/api/v1/roles/{id}", "DELETE", "ROLES"));
            arr.add(new Permission("Lấy role theo id", "/api/v1/roles/{id}", "GET", "ROLES"));
            arr.add(new Permission("Lấy tất cả roles theo pagination", "/api/v1/roles/pagination", "GET", "ROLES"));
            arr.add(new Permission("Lấy tất cả roles", "/api/v1/roles", "GET", "ROLES"));

            arr.add(new Permission("Tạo mới user", "/api/v1/users", "POST", "USERS"));
            arr.add(new Permission("Chỉnh sửa user", "/api/v1/users", "PUT", "USERS"));
            arr.add(new Permission("Xóa user theo id", "/api/v1/users/{id}", "DELETE", "USERS"));
            arr.add(new Permission("Lấy user theo id", "/api/v1/users/{id}", "GET", "USERS"));
            arr.add(new Permission("Lấy user theo email", "/api/v1/users/email/{email}", "GET", "USERS"));
            arr.add(new Permission("Lấy tất cả users theo pagination", "/api/v1/users/pagination", "GET", "USERS"));
            arr.add(new Permission("Lấy tất cả users", "/api/v1/users", "GET", "USERS"));

            arr.add(new Permission("Tạo mới category", "/api/v1/categories", "POST", "CATEGORIES"));
            arr.add(new Permission("Chỉnh sửa category", "/api/v1/categories", "PUT", "CATEGORIES"));
            arr.add(new Permission("Lấy tất cả categories theo pagination", "/api/v1/categories/pagination", "GET", "CATEGORIES"));
            arr.add(new Permission("Lấy tất cả categories", "/api/v1/categories", "GET", "CATEGORIES"));

            arr.add(new Permission("Tạo mới product", "/api/v1/products", "POST", "PRODUCTS"));
            arr.add(new Permission("Chỉnh sửa product", "/api/v1/products", "PUT", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products", "/api/v1/products", "GET", "PRODUCTS"));
            arr.add(new Permission("Xóa product theo id", "/api/v1/products/{id}", "DELETE", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products theo pagination", "/api/v1/products/pagination", "GET", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products active theo pagination", "/api/v1/products/active", "GET", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products low-stock", "/api/v1/products/low-stock", "GET", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products low-stock theo pagination", "/api/v1/products/low-stock/pagination", "GET", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products follow theo pagination", "/api/v1/products/follow", "GET", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products theo id import-goods", "/api/v1/products/fetch-by-import-goods/{id}", "GET", "PRODUCTS"));
            arr.add(new Permission("Lấy tất cả products theo id category", "/api/v1/products/fetch-by-category/{id}", "GET", "PRODUCTS"));

            arr.add(new Permission("Tạo mới company", "/api/v1/companies", "POST", "COMPANIES"));
            arr.add(new Permission("Chỉnh sửa company", "/api/v1/companies", "PUT", "COMPANIES"));
            arr.add(new Permission("Xóa product theo id", "/api/v1/companies/{id}", "DELETE", "COMPANIES"));
            arr.add(new Permission("Lấy tất cả companies theo pagination", "/api/v1/companies", "GET", "COMPANIES"));
            arr.add(new Permission("Lấy tất cả companies sell", "/api/v1/companies/sell", "GET", "COMPANIES"));
            arr.add(new Permission("Lấy tất cả companies buy", "/api/v1/companies/buy", "GET", "COMPANIES"));
            arr.add(new Permission("Lấy tất cả companies sell and active true", "/api/v1/companies/active/sell", "GET", "COMPANIES"));
            arr.add(new Permission("Lấy tất cả companies buy and active true", "/api/v1/companies/active/buy", "GET", "COMPANIES"));

            arr.add(new Permission("Lấy company detail theo id", "/api/v1/companies_detail/{id}", "GET", "COMPANIES_DETAIL"));

            arr.add(new Permission("Tạo mới import goods", "/api/v1/import_goods", "POST", "IMPORT_GOODS"));
            arr.add(new Permission("Lấy tất cả import goods theo pagination", "/api/v1/import_goods", "GET", "IMPORT_GOODS"));

            arr.add(new Permission("Tạo mới export goods", "/api/v1/export_goods", "POST", "EXPORT_GOODS"));
            arr.add(new Permission("Lấy tất cả export goods theo pagination", "/api/v1/export_goods", "GET", "EXPORT_GOODS"));

            arr.add(new Permission("Tạo mới export goods detail", "/api/v1/export_goods_detail", "POST", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy tất cả export goods detail theo pagination", "/api/v1/export_goods_detail", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy daily profit", "/api/v1/export_goods_detail/profit/{date}", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy tất cả profit month", "/api/v1/export_goods_detail/daily/month", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy tất cả profit year", "/api/v1/export_goods_detail/monthly/year", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy export goods detail theo id", "/api/v1/export_goods_detail/detail/{id}", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy tất cả product-total-amount-day", "/api/v1/export_goods_detail/product-total-amount-day", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy tất cả product-total-amount-month", "/api/v1/export_goods_detail/product-total-amount-month", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy tất cả profit-by-month", "/api/v1/export_goods_detail/profit-by-month", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Báo cáo xuất hàng theo tháng", "/api/v1/export_goods_detail/report/month", "GET", "EXPORT_GOODS_DETAIL"));
            arr.add(new Permission("Báo cáo xuất hàng theo năm", "/api/v1/export_goods_detail/report/year", "GET", "EXPORT_GOODS_DETAIL"));

            arr.add(new Permission("Tạo mới import goods detail", "/api/v1/import_goods_detail", "POST", "IMPORT_GOODS_DETAIL"));
            arr.add(new Permission("Lấy import goods detail theo id", "/api/v1/import_goods_detail/detail/{id}", "GET", "IMPORT_GOODS_DETAIL"));
            arr.add(new Permission("Báo cáo nhập hàng theo tháng", "/api/v1/import_goods_detail/report/month", "GET", "IMPORT_GOODS_DETAIL"));
            arr.add(new Permission("Báo cáo nhập hàng theo năm", "/api/v1/import_goods_detail/report/year", "GET", "IMPORT_GOODS_DETAIL"));

            arr.add(new Permission("upload single file", "/api/v1/files", "POST", "UPLOAD_FILE"));

            arr.add(new Permission("Tạo mới logo", "/api/v1/logo", "POST", "UPLOAD_FILE"));
            arr.add(new Permission("Lấy logo", "/api/v1/logo", "GET", "UPLOAD_FILE"));

            arr.add(new Permission("Tạo mới hoặc chỉnh sửa một follow", "/api/v1/follows", "POST", "FOLLOW"));

            this.permissionRepo.saveAll(arr);
        }

        if (countRoles == 0) {
            List<Permission> allPermissions = this.permissionRepo.findAll();

            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            adminRole.setDescription("Admin thì full permissions");
            adminRole.setActive(true);
            adminRole.setPermissions(allPermissions);

            this.roleRepo.save(adminRole);
        }

        if (countUsers == 0) {
            User adminUser = new User();
            adminUser.setEmail("phik07tx02102002@gmail.com");
            adminUser.setName("ADMIN");
            adminUser.setPassword(this.passwordEncoder.encode("123456"));
            adminUser.setActive(true);

            Role adminRole = this.roleRepo.findByName("ADMIN");
            if (adminRole != null) {
                adminUser.setRole(adminRole);
            }

            this.userRepo.save(adminUser);
        }

        if (countPermissions > 0 && countRoles > 0 && countUsers > 0) {
            System.out.println(">>> SKIP INIT DATABASE ~ ALREADY HAVE DATA...");
        } else
            System.out.println(">>> END INIT DATABASE");
    }

}
