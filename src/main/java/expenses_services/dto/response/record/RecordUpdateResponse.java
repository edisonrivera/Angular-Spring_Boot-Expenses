package expenses_services.dto.response.record;

import lombok.Data;

@Data
public class RecordUpdateResponse {
    private Long id;
    private Double amount;
    private String note;
    private String type;
    private String category;
}
