package expenses_services.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class ResponseModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    String code;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    String message;

    @JsonIgnore
    public ResponseModel(String code) {
        this.code = !code.isEmpty() ? code : null;
        this.message = null;
    }
}
