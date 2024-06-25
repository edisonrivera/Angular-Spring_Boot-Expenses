package expenses_services.dto.response.record;

import expenses_services.expenses_persistence.entity.interfaz.ListRecordInterfaz;
import lombok.Data;

import java.util.List;

@Data
public class RecordListResponse {
    private List<ListRecordInterfaz> records;
    private Long totalRecords;
}
