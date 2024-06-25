package expenses_services.expenses_persistence.service;

import expenses_services.expenses_persistence.entity.RecordEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListRecordInterfaz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RecordService {
    Page<ListRecordInterfaz> listRecords(Pageable pageable);
    RecordEntity saveRecord(RecordEntity recordEntity);
    Optional<RecordEntity> getById(Long id);
    void deleteById(Long id);
    Page<ListRecordInterfaz> listByKeyword(String keyword, Pageable pageable);
    Page<RecordEntity> findRecordsByFilters(String keyword, LocalDate onlyDate, LocalDate startDate, LocalDate endDate, Long categoryId, Pageable pageable);
    List<ListRecordInterfaz> listRecordsByIds(List<Long> recordsIds);
}
