package expenses_services.controller;

import expenses_services.dto.request.record.RecordCreateRequest;
import expenses_services.dto.request.record.RecordUpdateRequest;
import expenses_services.dto.response.record.RecordListResponse;
import expenses_services.dto.response.record.RecordUpdateResponse;
import expenses_services.model.ResponseData;
import expenses_services.service.RecordControllerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/records")
@Tag(name = "Record :: Controller", description = "CRUD Operations for Records")
public class RecordController {
    private final RecordControllerService recordControllerService;

    public RecordController(RecordControllerService recordControllerService) {
        this.recordControllerService = recordControllerService;
    }

    @PostMapping("/")
    public ResponseEntity<String> createRecord(@Valid @RequestBody RecordCreateRequest request,
            UriComponentsBuilder ucb) {
        return recordControllerService.createRecord(request, ucb);
    }

    @PutMapping("/")
    public ResponseEntity<ResponseData<RecordUpdateResponse>> updateRecord(
            @Valid @RequestBody RecordUpdateRequest request) {
        return recordControllerService.updateRecord(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<String>> deleteRecord(@PathVariable Long id) {
        return recordControllerService.deleteRecord(id);
    }

    @GetMapping("/{pageNo}/{pageSize}")
    public ResponseEntity<ResponseData<RecordListResponse>> listRecordsByKeyword(@PathVariable Integer pageNo,
            @PathVariable @Max(15) @Min(1) Integer pageSize) {

        return recordControllerService.listRecords(pageNo, pageSize);
    }

    @GetMapping("/filters/{pageNo}/{pageSize}")
    public ResponseEntity<ResponseData<RecordListResponse>> getMethodName(
            @PathVariable Integer pageNo,
            @PathVariable @Max(15) @Min(1) Integer pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate onlyDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long categoryId) {
        return recordControllerService.findRecordsByFilters(pageNo, pageSize, keyword, onlyDate, startDate, endDate, categoryId);
    }

}
