package expenses_services.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import expenses_services.emun.AmountEnum;
import expenses_services.expenses_persistence.entity.interfaz.BalancesInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticRecordInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticWeekRecordInterfaz;
import expenses_services.model.ResponseData;
import expenses_services.service.StadisticControllerService;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/stadistics")
@Tag(name = "Stadistics :: Controller", description = "Get Stadistics about expenses")
public class StadisticController {
    private final StadisticControllerService stadisticControllerService;

    public StadisticController(StadisticControllerService stadisticControllerService){
        this.stadisticControllerService = stadisticControllerService;
    }
    
    @GetMapping("/balances")
    public ResponseEntity<ResponseData<BalancesInterfaz>> getStadistics() {
        return stadisticControllerService.getStadistics();
    }

    @GetMapping("/amounts")
    public ResponseEntity<ResponseData<List<StadisticRecordInterfaz>>> getStadisticAmounts() {
        return stadisticControllerService.getStadisticRecords(AmountEnum.INCOME.getCode());
    }

    @GetMapping("/expenses")
    public ResponseEntity<ResponseData<List<StadisticRecordInterfaz>>> getStadisticExpenses() {
        return stadisticControllerService.getStadisticRecords(AmountEnum.EXPENSE.getCode());
    }

    @GetMapping("/week_amounts")
    public ResponseEntity<ResponseData<List<StadisticWeekRecordInterfaz>>> getStadisticWeekAmounts(
        @RequestParam() @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return stadisticControllerService.getStadisticWeekAmounts(date);
    }

    @GetMapping("/week_expenses")
    public ResponseEntity<ResponseData<List<StadisticWeekRecordInterfaz>>> getStadisticWeekExpenses(
        @RequestParam() @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return stadisticControllerService.getStadisticWeekExpenses(date);
    }
}
