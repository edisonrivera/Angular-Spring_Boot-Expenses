package expenses_services.expenses_persistence.repository;

import expenses_services.expenses_persistence.entity.TypeCategoryEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeCategoryRepository extends JpaRepository<TypeCategoryEntity, Integer> {
    @Query("SELECT EXISTS(SELECT 1 FROM TypeCategoryEntity tc WHERE :id IN (SELECT tc1.id FROM TypeCategoryEntity tc1))")
    boolean existsTypeCategory(@Param("id") Integer id);

    @Query("SELECT tc.name FROM TypeCategoryEntity tc WHERE tc.id = :id")
    String getNameById(@Param("id") Integer id);
}
