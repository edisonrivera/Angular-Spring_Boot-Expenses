package expenses_services.dto.request.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryUpdateRequest {
    @NotNull(message = "An id is required")
    private Long id;

    @NotBlank(message = "A title is required")
    @Size(max = 30)
    private String title;

    @NotNull(message = "An type id is required")
    private Integer typeId;
}
