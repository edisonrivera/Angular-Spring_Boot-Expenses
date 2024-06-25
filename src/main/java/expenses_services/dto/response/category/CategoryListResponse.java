package expenses_services.dto.response.category;

import lombok.Data;
import expenses_services.expenses_persistence.entity.interfaz.ListCategoryInterfaz;

import java.util.List;

@Data
public class CategoryListResponse {
    private List<ListCategoryInterfaz> categories;
    private Long totalCategories;
}
