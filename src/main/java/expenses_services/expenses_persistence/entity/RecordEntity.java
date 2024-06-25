package expenses_services.expenses_persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "expenses1_recordmodel")
@Data
public class RecordEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "note")
    private String note;

    @Column(name = "fk_id_category_id")
    private Long fkIdCategory;

    @Column(name = "register_date")
    private Date registerDate;
}
