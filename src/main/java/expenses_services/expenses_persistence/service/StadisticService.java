package expenses_services.expenses_persistence.service;

import java.time.LocalDate;
import java.util.List;

import expenses_services.expenses_persistence.entity.interfaz.BalancesInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticRecordInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticWeekRecordInterfaz;

public interface StadisticService {
    BalancesInterfaz getBalances();
    List<StadisticRecordInterfaz> getStadisticRecords(Integer typeId);
    List<StadisticWeekRecordInterfaz> getStadisticWeekAmounts(LocalDate date);
    List<StadisticWeekRecordInterfaz> getStadisticWeekExpenses(LocalDate date);
}
