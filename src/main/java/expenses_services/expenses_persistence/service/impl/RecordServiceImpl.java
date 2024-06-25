package expenses_services.expenses_persistence.service.impl;

import expenses_services.expenses_persistence.entity.RecordEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListRecordInterfaz;
import expenses_services.expenses_persistence.repository.RecordRepository;
import expenses_services.expenses_persistence.service.RecordService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class RecordServiceImpl implements RecordService {
    private final RecordRepository recordRepository;
    public RecordServiceImpl(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @Override
    public Page<ListRecordInterfaz> listRecords(Pageable pageable) {
        return recordRepository.listRecords(pageable);
    }

    @Override
    public RecordEntity saveRecord(RecordEntity recordEntity) {
        return recordRepository.save(recordEntity);
    }

    @Override
    public Optional<RecordEntity> getById(Long id) {
        return recordRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        recordRepository.deleteById(id);
    }

    @Override
    public Page<ListRecordInterfaz> listByKeyword(String keyword, Pageable pageable) {
        return recordRepository.listByKeyword(keyword, pageable);
    }

    @Override
    public Page<RecordEntity> findRecordsByFilters(String keyword, LocalDate onlyDate, LocalDate startDate, LocalDate endDate, Long categoryId, Pageable pageable) {
        return recordRepository.findAll((root, query, criteriaBuilder) -> {
            List<Specification<RecordEntity>> specifications = new ArrayList<>();

            if (keyword != null && !keyword.isEmpty()) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.like(root1.get("note"), "%" + keyword + "%"));
            }
            if (onlyDate != null){
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(root1.get("registerDate"), onlyDate));
            }
            if (startDate != null && endDate != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.between(root1.get("registerDate"), startDate, endDate));
            }
            if (categoryId != null) {
                specifications.add((root1, query1, criteriaBuilder1) -> criteriaBuilder1.equal(root1.get("fkIdCategory"), categoryId));
            }
            if (specifications.isEmpty()) {
                return null;
            }

            Specification<RecordEntity> result = specifications.get(0);
            for (int i = 1; i < specifications.size(); i++) {
                result = result.and(specifications.get(i));
            }

            return result.toPredicate(root, query, criteriaBuilder);
        }, pageable);
    }

    @Override
    public List<ListRecordInterfaz> listRecordsByIds(List<Long> recordsIds) {
        return recordRepository.listRecordsByIds(recordsIds);
    }
}
