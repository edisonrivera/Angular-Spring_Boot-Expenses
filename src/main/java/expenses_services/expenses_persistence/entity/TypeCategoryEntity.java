package expenses_services.expenses_persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "type_category")
@Data
public class TypeCategoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;
}
