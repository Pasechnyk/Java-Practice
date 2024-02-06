package org.example;

// Імпортування анотацій Lombok
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Анотації Lombok для автоматичного створення геттерів, сеттерів, toString і конструкторів
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreate {
    private String name;
    private String description;
}
