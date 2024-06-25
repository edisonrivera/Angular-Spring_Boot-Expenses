package expenses_services.dto.response.category;

import lombok.Data;

@Data
public class CategoryCreateResponse {
    private String category;
    private Integer typeId;
}
