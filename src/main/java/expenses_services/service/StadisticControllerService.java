package expenses_services.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import expenses_services.constant.Constant;
import expenses_services.expenses_persistence.entity.interfaz.BalancesInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticRecordInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticWeekRecordInterfaz;
import expenses_services.expenses_persistence.service.StadisticService;
import expenses_services.model.ResponseData;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StadisticControllerService {
    private final StadisticService stadisticService;

    public StadisticControllerService(StadisticService stadisticService){
        this.stadisticService = stadisticService;
    }

    public ResponseEntity<ResponseData<BalancesInterfaz>> getStadistics(){
        ResponseData<BalancesInterfaz> response = new ResponseData<>(Constant.EMPTY);

        try{
            response.setData(stadisticService.getBalances());
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
                        response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<List<StadisticRecordInterfaz>>> getStadisticRecords(Integer typeId){
        ResponseData<List<StadisticRecordInterfaz>> response = new ResponseData<>(Constant.EMPTY);

        try{
            response.setData(stadisticService.getStadisticRecords(typeId));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
                        response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<List<StadisticWeekRecordInterfaz>>> getStadisticWeekAmounts(LocalDate date){
        ResponseData<List<StadisticWeekRecordInterfaz>> response = new ResponseData<>(Constant.EMPTY);

        try{
            response.setData(stadisticService.getStadisticWeekAmounts(date));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
                        response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ResponseData<List<StadisticWeekRecordInterfaz>>> getStadisticWeekExpenses(LocalDate date){
        ResponseData<List<StadisticWeekRecordInterfaz>> response = new ResponseData<>(Constant.EMPTY);

        try{
            response.setData(stadisticService.getStadisticWeekExpenses(date));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e){
                        response.setMessage("Error to list records");
            log.error("[!] Error: {}", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
