package expenses_services.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import java.io.Serial;

@Setter
@Getter
public class ResponseData<T> extends ResponseModel {
    @Serial
    private static final long serialVersionUID = 1L;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public ResponseData(String code) {
        super(code);
    }
}
