package expenses_services.service;

import expenses_services.constant.Constant;
import expenses_services.dto.request.category.CategoryCreateRequest;
import expenses_services.dto.request.category.CategoryUpdateRequest;
import expenses_services.dto.response.category.CategoryCreateResponse;
import expenses_services.dto.response.category.CategoryListResponse;
import expenses_services.dto.response.category.CategoryUpdateResponse;
import expenses_services.expenses_persistence.entity.CategoryEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListCategoryInterfaz;
import expenses_services.expenses_persistence.service.CategoryService;
import expenses_services.expenses_persistence.service.TypeCategoryService;
import expenses_services.model.ResponseData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Service
@Slf4j
public class CategoryControllerService {
    private final CategoryService categoryService;
    private final TypeCategoryService typeCategoryService;

    public CategoryControllerService(CategoryService categoryService, TypeCategoryService typeCategoryService) {
        this.categoryService = categoryService;
        this.typeCategoryService = typeCategoryService;
    }

    public ResponseEntity<ResponseData<CategoryListResponse>> listCategories(Integer pageNo, Integer pageSize) {
        ResponseData<CategoryListResponse> response = new ResponseData<>(Constant.EMPTY);

        try{
            CategoryListResponse categoryListResponse = new CategoryListResponse();
            Page<ListCategoryInterfaz> categories = categoryService.listCategories(PageRequest.of(pageNo, pageSize));
            categoryListResponse.setCategories(categoryService.listCategories(PageRequest.of(pageNo, pageSize)).getContent());
            categoryListResponse.setTotalCategories(categories.getTotalElements());

            response.setData(categoryListResponse);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            response.setMessage("Error to list categories");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<CategoryCreateResponse>> createCategory(CategoryCreateRequest request) {
        ResponseData<CategoryCreateResponse> response = new ResponseData<>(Constant.EMPTY);

        try{
            String title = request.getTitle().strip();

            if (categoryService.existsByTitle(title)){
                response.setMessage("Category already exists");
                return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            Integer typeId = request.getTypeId();
            if (!typeCategoryService.existsTypeCategory(typeId)){
                response.setMessage("Type category doesn't exists");
                return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
            }


            CategoryEntity categoryEntity = new CategoryEntity();
            categoryEntity.setTitle(title);
            categoryEntity.setFkIdType(typeId);

            CategoryEntity categorySaved = categoryService.saveCategory(categoryEntity);
            CategoryCreateResponse categoryCreateResponse = new CategoryCreateResponse();
            categoryCreateResponse.setCategory(categorySaved.getTitle());
            categoryCreateResponse.setTypeId(categorySaved.getFkIdType());

            response.setData(categoryCreateResponse);
            response.setMessage("Category created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e){
            response.setMessage("Error to create category");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<CategoryUpdateResponse>> updateCategory(CategoryUpdateRequest request){
        ResponseData<CategoryUpdateResponse> response = new ResponseData<>(Constant.EMPTY);
        try{
            Long id = request.getId();
            Optional<CategoryEntity> categoryEntity = categoryService.getById(id);

            if(categoryEntity.isEmpty()){
                response.setMessage("Category doesn't exists");
                return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            CategoryEntity category = categoryEntity.get();
            String title = request.getTitle().strip();

            if (categoryService.existsByTitle(title) && !category.getTitle().equalsIgnoreCase(title)){
                response.setMessage("Category with this title already exists");
                return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            Integer typeId = request.getTypeId();
            if (!typeCategoryService.existsTypeCategory(typeId)){
                response.setMessage("Type category doesn't exists");
                return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            category.setTitle(title);
            category.setFkIdType(typeId);

            CategoryEntity categorySaved = categoryService.saveCategory(category);

            CategoryUpdateResponse categoryUpdateResponse = new CategoryUpdateResponse();
            categoryUpdateResponse.setTitle(categorySaved.getTitle());
            categoryUpdateResponse.setId(categorySaved.getId());
            categoryUpdateResponse.setIdType(categorySaved.getFkIdType());

            response.setData(categoryUpdateResponse);
            response.setMessage("Category updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
            response.setMessage("Error to update category");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<String>> deleteCategory(Long id) {
        ResponseData<String> response = new ResponseData<>(Constant.EMPTY);

        try{
            Optional<CategoryEntity> categoryEntity = categoryService.getById(id);

            if(categoryEntity.isEmpty()){
                response.setMessage("Category doesn't exists");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            categoryService.deleteById(id);

            response.setMessage("Category deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
            response.setMessage("Error to delete category");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
