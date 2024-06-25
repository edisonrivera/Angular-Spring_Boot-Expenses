package expenses_services.expenses_persistence.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import expenses_services.expenses_persistence.entity.CategoryEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListCategoryInterfaz;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    @Query("SELECT c.id as id, c.title as title, tc.id as idType, tc.name as name FROM CategoryEntity c INNER JOIN TypeCategoryEntity tc ON tc.id = c.fkIdType ORDER BY c.id")
    Page<ListCategoryInterfaz> listCategories(Pageable pageable);

    @Query("SELECT EXISTS(SELECT 1 FROM CategoryEntity c WHERE UPPER(c.title) = :title)")
    boolean existsByTitle(@Param("title") String title);

    @Query("SELECT EXISTS(SELECT 1 FROM CategoryEntity tc WHERE :id IN (SELECT c1.id FROM CategoryEntity c1))")
    boolean existsCategoryById(@Param("id") Long id);

    @Query("SELECT c.title FROM CategoryEntity c WHERE c.id = :id")
    String getTitleById(@Param("id") Long id);

    @Query("SELECT t.id FROM TypeCategoryEntity t INNER JOIN CategoryEntity c ON c.fkIdType = t.id WHERE c.id = :id")
    Integer getTypeCategoryByCategoryId(@Param("id") Long id);
}
