package expenses_services.emun;

import lombok.Getter;

@Getter
public enum AmountEnum {
    INCOME(2),
    EXPENSE(1);

    AmountEnum(Integer code){
        this.code = code;
    }

    private Integer code;

}
