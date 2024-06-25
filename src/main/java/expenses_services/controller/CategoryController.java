package expenses_services.controller;


import expenses_services.dto.request.category.CategoryCreateRequest;
import expenses_services.dto.request.category.CategoryUpdateRequest;
import expenses_services.dto.response.category.CategoryCreateResponse;
import expenses_services.dto.response.category.CategoryUpdateResponse;
import expenses_services.service.CategoryControllerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import expenses_services.dto.response.category.CategoryListResponse;
import expenses_services.model.ResponseData;


@RestController
@RequestMapping("/api/v1/categories")
@Tag(name = "Category :: Controller", description = "CRUD Operations for Categories")
public class CategoryController {
    private final CategoryControllerService categoryControllerService;


    public CategoryController(CategoryControllerService categoryControllerService) {
        this.categoryControllerService = categoryControllerService;
    }

    @GetMapping("/{pageNo}/{pageSize}")
    public ResponseEntity<ResponseData<CategoryListResponse>> listCategories(@Valid @PathVariable Integer pageNo,
                                                                             @PathVariable @Max(10) @Min(1) Integer pageSize) {
            return categoryControllerService.listCategories(pageNo, pageSize);
    }

    @PostMapping
    public ResponseEntity<ResponseData<CategoryCreateResponse>> createCategory(@Valid @RequestBody CategoryCreateRequest request) {
        return categoryControllerService.createCategory(request);
    }

    @PutMapping
    public ResponseEntity<ResponseData<CategoryUpdateResponse>> updateCategory(@Valid @RequestBody CategoryUpdateRequest request) {
        return categoryControllerService.updateCategory(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<String>> deleteCategory(@Valid @PathVariable @Min(0) Long id) {
        return categoryControllerService.deleteCategory(id);
    }
}
