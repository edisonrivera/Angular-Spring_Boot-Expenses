package expenses_services.expenses_persistence.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import expenses_services.expenses_persistence.entity.CategoryEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListCategoryInterfaz;
import expenses_services.expenses_persistence.repository.CategoryRepository;
import expenses_services.expenses_persistence.service.CategoryService;

import java.util.Optional;


@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Page<ListCategoryInterfaz> listCategories(Pageable pageable) {
        return categoryRepository.listCategories(pageable);
    }

    @Override
    public CategoryEntity saveCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    @Override
    public boolean existsByTitle(String title) {
        return categoryRepository.existsByTitle(title);
    }

    @Override
    public Optional<CategoryEntity> getById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public boolean existsCategoryById(Long id) {
        return categoryRepository.existsCategoryById(id);
    }

    @Override
    public String getTitleById(Long id) {
        return categoryRepository.getTitleById(id);
    }


    @Override
    public Integer getTypeCategoryByCategoryId(Long id) {
        return categoryRepository.getTypeCategoryByCategoryId(id);
    }
}
