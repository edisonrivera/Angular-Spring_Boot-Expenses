package expenses_services.expenses_persistence.service;

import java.util.List;

import expenses_services.expenses_persistence.entity.TypeCategoryEntity;

public interface TypeCategoryService {
    boolean existsTypeCategory(Integer id);
    String getNameById(Integer id);
    List<TypeCategoryEntity> findAll();
}
