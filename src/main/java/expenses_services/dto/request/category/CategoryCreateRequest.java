package expenses_services.dto.request.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryCreateRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 30)
    private String title;

    @NotNull(message = "Type is required")
    private Integer typeId;
}
