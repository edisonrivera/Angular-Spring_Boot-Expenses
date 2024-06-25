package expenses_services.expenses_persistence.entity.interfaz;

import java.util.Date;

public interface ListRecordInterfaz {
    Long getId();
    Double getAmount();
    String getNote();
    String getCategory();
    Long getCategoryId();
    String getType();
    Date getRegisterDate();
}
