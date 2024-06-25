package expenses_services.expenses_persistence.repository;

import expenses_services.expenses_persistence.entity.RecordEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListRecordInterfaz;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<RecordEntity, Long>, JpaSpecificationExecutor<RecordEntity> {
    @Query("SELECT r.id as id, r.amount as amount, r.note as note, c.id as categoryId, tc.name as type, c.title as category, r.registerDate as registerDate FROM RecordEntity r " +
            "INNER JOIN CategoryEntity c ON c.id = r.fkIdCategory " +
            "INNER JOIN TypeCategoryEntity tc ON tc.id = c.fkIdType")
    Page<ListRecordInterfaz> listRecords(Pageable pageable);

    @Query("SELECT r.id as id, r.amount as amount, r.note as note, c.title as category, tc.name as type, r.registerDate as registerDate FROM RecordEntity r " +
            "INNER JOIN CategoryEntity c ON c.id = r.fkIdCategory " +
            "INNER JOIN TypeCategoryEntity tc ON tc.id = c.fkIdType " +
            "WHERE r.note LIKE %:keyword%")
    Page<ListRecordInterfaz> listByKeyword(@Param("keyword") String keyword, Pageable pageable);


    @Query("SELECT r.id as id, r.amount as amount, r.note as note, c.id as categoryId, tc.name as type, c.title as category, r.registerDate as registerDate FROM RecordEntity r " +
            "INNER JOIN CategoryEntity c ON c.id = r.fkIdCategory " +
            "INNER JOIN TypeCategoryEntity tc ON tc.id = c.fkIdType WHERE r.id IN (:recordsIds)")
    List<ListRecordInterfaz> listRecordsByIds(@Param("recordsIds") List<Long> recordsIds);
}
