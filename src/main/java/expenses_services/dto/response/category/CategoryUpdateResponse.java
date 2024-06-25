package expenses_services.dto.response.category;

import lombok.Data;

@Data
public class CategoryUpdateResponse {
    private Long id;
    private String title;
    private Integer idType;
}
