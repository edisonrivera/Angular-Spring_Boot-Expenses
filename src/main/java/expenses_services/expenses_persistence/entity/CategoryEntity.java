package expenses_services.expenses_persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "expenses1_categorymodel")
@Entity
@Data
public class CategoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "fk_id_type_id")
    private Integer fkIdType;
}
