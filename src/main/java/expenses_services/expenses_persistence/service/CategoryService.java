package expenses_services.expenses_persistence.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import expenses_services.expenses_persistence.entity.CategoryEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListCategoryInterfaz;
import java.util.Optional;

public interface CategoryService {
    Page<ListCategoryInterfaz> listCategories(Pageable pageable);
    CategoryEntity saveCategory(CategoryEntity category);
    boolean existsByTitle(String title);
    Optional<CategoryEntity> getById(Long id);
    void deleteById(Long id);
    boolean existsCategoryById(Long id);
    String getTitleById(Long id);
    Integer getTypeCategoryByCategoryId(Long id);
}
