package expenses_services.expenses_persistence.service.impl;

import expenses_services.expenses_persistence.entity.TypeCategoryEntity;
import expenses_services.expenses_persistence.repository.TypeCategoryRepository;
import expenses_services.expenses_persistence.service.TypeCategoryService;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TypeCategoryServiceImpl implements TypeCategoryService {
    private final TypeCategoryRepository typeCategoryRepository;

    public TypeCategoryServiceImpl(TypeCategoryRepository typeCategoryRepository) {
        this.typeCategoryRepository = typeCategoryRepository;
    }

    @Override
    public boolean existsTypeCategory(Integer id) {
        return typeCategoryRepository.existsTypeCategory(id);
    }

    @Override
    public String getNameById(Integer id) {
        return typeCategoryRepository.getNameById(id);
    }

    @Override
    public List<TypeCategoryEntity> findAll() {
        return typeCategoryRepository.findAll();
    }
}
