package com.example.todo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

/**Id
 * UserId
 * Title
 * Description
 * Completed
 * Position X
 * Position Y
 */
@Entity
@Table(name = "todos")
@Getter
@Setter
@NoArgsConstructor //Konstruktoren  mit und ohne parametern
@AllArgsConstructor
public class ToDo {
    @Id
    @UuidGenerator  // z.B. "a3bb189e-8bf9-3888-9912-ace4e6543002" -> kann nicht erraten werden
    @Column(name = "id", unique = true , updatable = false)
    private String id;
    private String title;
    private String description;
    private boolean completed;
    private double x ;
    private double y ;
}
