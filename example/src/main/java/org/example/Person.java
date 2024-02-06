package org.example;

// Імпортування анотацій Lombok
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Анотації Lombok для автоматичного створення геттерів, сеттерів, toString і конструкторів
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person implements Comparable{
    private String firstName;
    private String lastName;

    // Перевизначити метод compareTo, щоб увімкнути сортування об’єктів Person
    @Override
    public int compareTo(Object o) {
        // Приведення об'єкта до типу Person
        Person p = (Person)o;
        int result = this.lastName.compareTo(p.lastName);
        if (result==0)
            result = this.firstName.compareTo(p.firstName);
        return result;
    }
}
