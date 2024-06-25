package expenses_services.expenses_persistence.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import expenses_services.expenses_persistence.entity.interfaz.BalancesInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticRecordInterfaz;
import expenses_services.expenses_persistence.entity.interfaz.StadisticWeekRecordInterfaz;
import expenses_services.expenses_persistence.repository.StadisticRepository;
import expenses_services.expenses_persistence.service.StadisticService;


@Service
public class StadisticServiceImpl implements StadisticService {
    private final StadisticRepository stadisticRepository;

    public StadisticServiceImpl(StadisticRepository stadisticRepository){
        this.stadisticRepository = stadisticRepository;
    }

    @Override
    public BalancesInterfaz getBalances() {
        return stadisticRepository.getBalances();
    }

    @Override
    public List<StadisticRecordInterfaz> getStadisticRecords(Integer typeId) {
        return stadisticRepository.getStadisticRecords(typeId);
    }

    @Override
    public List<StadisticWeekRecordInterfaz> getStadisticWeekAmounts(LocalDate date) {
        return stadisticRepository.getStadisticWeekAmounts(date);
    }

    @Override
    public List<StadisticWeekRecordInterfaz> getStadisticWeekExpenses(LocalDate date) {
        return stadisticRepository.getStadisticWeekExpenses(date);
    }
    
}
