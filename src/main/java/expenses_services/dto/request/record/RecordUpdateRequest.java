package expenses_services.dto.request.record;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RecordUpdateRequest {
    private Long id;
    @NotNull(message = "An amount is required")
    @DecimalMin(value = "0.01", message = "The amount must be greater than or equal to 0.01")
    @DecimalMax(value = "99999999.99", inclusive = false, message = "The amount is too big")
    @Positive(message = "The amount must be positive")
    private Double amount;

    @Size(max = 200, message = "The note must be at most 200 characters long")
    private String note;

    @NotNull(message = "A category is required")
    private Long categoryId;
}
