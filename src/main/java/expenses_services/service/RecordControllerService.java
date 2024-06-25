package expenses_services.service;

import expenses_services.constant.Constant;
import expenses_services.dto.request.record.RecordCreateRequest;
import expenses_services.dto.request.record.RecordUpdateRequest;
import expenses_services.dto.response.record.RecordListResponse;
import expenses_services.dto.response.record.RecordUpdateResponse;
import expenses_services.emun.AmountEnum;
import expenses_services.expenses_persistence.entity.RecordEntity;
import expenses_services.expenses_persistence.entity.interfaz.ListRecordInterfaz;
import expenses_services.expenses_persistence.service.CategoryService;
import expenses_services.expenses_persistence.service.RecordService;
import expenses_services.model.ResponseData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class RecordControllerService {
    private final RecordService recordService;
    private final CategoryService categoryService;

    public RecordControllerService(RecordService recordService, CategoryService categoryService) {
        this.recordService = recordService;
        this.categoryService = categoryService;
    }

    public ResponseEntity<ResponseData<RecordListResponse>> listRecords(Integer pageNo, Integer pageSize) {
        ResponseData<RecordListResponse> response = new ResponseData<>(Constant.EMPTY);

        try {
            Page<ListRecordInterfaz> records = recordService.listRecords(PageRequest.of(pageNo, pageSize));

            RecordListResponse recordListResponse = new RecordListResponse();
            recordListResponse.setRecords(records.getContent());
            recordListResponse.setTotalRecords(records.getTotalElements());

            response.setData(recordListResponse);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
            response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<RecordListResponse>> listRecordsSecondary(Pageable pageble) {
        ResponseData<RecordListResponse> response = new ResponseData<>(Constant.EMPTY);

        try {
            Page<ListRecordInterfaz> records = recordService.listRecords(pageble);

            RecordListResponse recordListResponse = new RecordListResponse();
            recordListResponse.setRecords(records.getContent());
            recordListResponse.setTotalRecords(records.getTotalElements());

            response.setData(recordListResponse);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
            response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> createRecord(RecordCreateRequest request, UriComponentsBuilder ucb) {
        try{
            String note = request.getNote();
            Long categoryId = request.getCategoryId();

            if (!categoryService.existsCategoryById(categoryId)){
                return ResponseEntity.unprocessableEntity().body("Category doesn't exists");
            }

            Integer typeId = categoryService.getTypeCategoryByCategoryId(categoryId);
            Double amount = typeId.equals(AmountEnum.EXPENSE.getCode()) ? request.getAmount() * -1 : request.getAmount();

            RecordEntity recordEntity = new RecordEntity();
            recordEntity.setAmount(amount);
            recordEntity.setNote(note);
            recordEntity.setFkIdCategory(categoryId);
            recordEntity.setRegisterDate(Date.valueOf(LocalDate.now()));
            RecordEntity recordSaved = recordService.saveRecord(recordEntity);

            URI locationOfNewRecord = ucb.path("/api/v1/records/{id}")
            .buildAndExpand(recordSaved.getId()).toUri();

            return ResponseEntity.created(locationOfNewRecord).build();
        } catch (Exception e){
            log.error("[!] Error: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<ResponseData<RecordUpdateResponse>> updateRecord(RecordUpdateRequest request){
        ResponseData<RecordUpdateResponse> response = new ResponseData<>(Constant.EMPTY);

        try{
            Optional<RecordEntity> recordEntityOp = recordService.getById(request.getId());

            if (recordEntityOp.isEmpty()){
                response.setMessage("Record not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            Long categoryId = request.getCategoryId();
            if (!categoryService.existsCategoryById(categoryId)){
                response.setMessage("Category doesn't exists");
                return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            Integer typeId = categoryService.getTypeCategoryByCategoryId(categoryId);
            Double amount = typeId.equals(AmountEnum.EXPENSE.getCode()) ? request.getAmount() * -1 : request.getAmount();

            RecordEntity recordEntity = recordEntityOp.get();
            recordEntity.setAmount(amount);
            recordEntity.setNote(request.getNote());
            recordEntity.setFkIdCategory(categoryId);

            RecordEntity recordEntitySaved = recordService.saveRecord(recordEntity);

            RecordUpdateResponse recordUpdateResponse = new RecordUpdateResponse();
            recordUpdateResponse.setAmount(recordEntitySaved.getAmount());
            recordUpdateResponse.setNote(recordEntitySaved.getNote());
            recordUpdateResponse.setCategory(categoryService.getTitleById(recordEntitySaved.getFkIdCategory()));

            response.setData(recordUpdateResponse);
            response.setMessage("Record updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            response.setMessage("Error to update a record");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<String>> deleteRecord(Long id){
        ResponseData<String> response = new ResponseData<>(Constant.EMPTY);
        try{
            Optional<RecordEntity> recordEntityOp = recordService.getById(id);

            if (recordEntityOp.isEmpty()){
                response.setMessage("Record not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            recordService.deleteById(id);

            response.setMessage("Record deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            response.setMessage("Error to delete a record");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<RecordListResponse>> findRecordsByFilters(Integer pageNo, Integer pageSize, String keyword, 
    LocalDate onlyDate, LocalDate startDate, LocalDate endDate, Long categoryId){
        ResponseData<RecordListResponse> response = new ResponseData<>(Constant.EMPTY);
        
        try{
            Page<RecordEntity> records = recordService.findRecordsByFilters(keyword, onlyDate, startDate, endDate, categoryId, PageRequest.of(pageNo, pageSize));

            List<Long> recordsIds = records.stream().parallel().map(recordEntity -> recordEntity.getId()).toList();
            
            RecordListResponse recordListResponse = new RecordListResponse();
            recordListResponse.setRecords(recordService.listRecordsByIds(recordsIds));
            recordListResponse.setTotalRecords(records.getTotalElements());
            response.setData(recordListResponse);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e){
            response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
