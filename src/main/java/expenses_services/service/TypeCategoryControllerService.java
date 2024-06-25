package expenses_services.service;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import expenses_services.constant.Constant;
import expenses_services.expenses_persistence.entity.TypeCategoryEntity;
import expenses_services.expenses_persistence.service.TypeCategoryService;
import expenses_services.model.ResponseData;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TypeCategoryControllerService {
    private final TypeCategoryService typeCategoryService;

    public TypeCategoryControllerService(TypeCategoryService typeCategoryService){
        this.typeCategoryService = typeCategoryService;
    }

    public ResponseEntity<ResponseData<List<TypeCategoryEntity>>> getAll(){
        ResponseData<List<TypeCategoryEntity>> response = new ResponseData<>(Constant.EMPTY);
        
        try{
            response.setData(typeCategoryService.findAll());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
