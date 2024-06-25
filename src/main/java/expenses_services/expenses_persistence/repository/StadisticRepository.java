package expenses_services.expenses_persistence.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import expenses_services.expenses_persistence.entity.RecordEntity;
import expenses_services.expenses_persistence.entity.interfaz.BalancesInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticRecordInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticWeekRecordInterfaz;

@Repository
public interface StadisticRepository extends JpaRepository<RecordEntity, Long>{
    @Query(value = "CALL GetBalances()", nativeQuery = true)
    BalancesInterfaz getBalances();

    @Query(value = "CALL GetStadisticRecords(:typeId)", nativeQuery = true)
    List<StadisticRecordInterfaz> getStadisticRecords(@Param("typeId") Integer typeId);

    @Query(value = "CALL GetAmountsWeek(:date)", nativeQuery = true)
    List<StadisticWeekRecordInterfaz> getStadisticWeekAmounts(@Param("date") LocalDate date);

    @Query(value = "CALL GetExpensesWeek(:date)", nativeQuery = true)
    List<StadisticWeekRecordInterfaz> getStadisticWeekExpenses(@Param("date") LocalDate date);
}
