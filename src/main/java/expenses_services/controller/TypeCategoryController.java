package expenses_services.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import expenses_services.expenses_persistence.entity.TypeCategoryEntity;
import expenses_services.model.ResponseData;
import expenses_services.service.TypeCategoryControllerService;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/types")
@Tag(name = "TypeCategory :: Controller", description = "List All Type Categories")
public class TypeCategoryController {
    private final TypeCategoryControllerService typeCategoryControllerService;

    public TypeCategoryController(TypeCategoryControllerService typeCategoryControllerService){
        this.typeCategoryControllerService = typeCategoryControllerService;
    }


    @GetMapping("/")
    public ResponseEntity<ResponseData<List<TypeCategoryEntity>>> getAll(){
        return typeCategoryControllerService.getAll();
    }
}
