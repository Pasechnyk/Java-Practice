package org.example;

import java.sql.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {

        //inputData();
        //simpleArray();
        //sortPerson();
        //jdbc - ado.net

        // Параметри підключення до БД
        String userName="root";
        String password="";
        String host = "localhost";
        String port = "3306";
        String database = "java_spu111";
        String strConn = "jdbc:mariadb://"+host+":"+port+"/"+database;
        // createCategory(strConn, userName, password);
        insertCategory(strConn, userName, password, new CategoryCreate("Куртка", "Осіння куртка"));
    }

    // Метод створення таблиці категорій в ДБ
    private static void createCategory(String strConn, String userName, String password) {

        try(Connection conn = DriverManager.getConnection(strConn,userName,password)) {
            Statement statement = conn.createStatement();
            // SQL-запит для створення таблиці "категорія"
            String createTableSQL = "CREATE TABLE IF NOT EXISTS categories ("
                    + "id INT AUTO_INCREMENT PRIMARY KEY,"
                    + "name VARCHAR(255) NOT NULL,"
                    + "description TEXT"
                    + ")";

            // Виконати SQL-запит
            statement.execute(createTableSQL);

            // Закрити ресурси
            statement.close();
            System.out.println("В БД створено таблицю categories");
        }
        catch(Exception ex) {
            System.out.println("Error connection: "+ex.getMessage());
        }
    }

    // Метод вставлення нової категорії в БД
    private static void insertCategory(String strConn, String userName, String password,
                                       CategoryCreate categoryCreate) {
        System.out.println("Вкажіть назву категорії");

        try(Connection conn = DriverManager.getConnection(strConn,userName,password)) {
            Statement statement = conn.createStatement();

            String insertQuery = "INSERT INTO categories (name, description) VALUES (?, ?)";
            // Створення PreparedStatement
            PreparedStatement preparedStatement = conn.prepareStatement(insertQuery);

            // Встановити значення для заповнювачів
            preparedStatement.setString(1, categoryCreate.getName());
            preparedStatement.setString(2, categoryCreate.getDescription());

            // Виконати SQL-запит
            int rowsAffected = preparedStatement.executeUpdate();

            // Закрити ресурси
            preparedStatement.close();
            System.out.println("Rows affected: " + rowsAffected);
            System.out.println("Category inserted successfully.");
        }
        catch(Exception ex) {
            System.out.println("Помилка створення категорії: "+ex.getMessage());
        }
    }

    // Метод для перерахування усіх категорій з БД
    private static List<CategoryItem> listCategories(String strConn, String userName, String password)
    {
        try(Connection conn = DriverManager.getConnection(strConn,userName,password)) {
            Statement statement = conn.createStatement();
            // SQL-запит для вибору всіх категорій
            String selectQuery = "SELECT * FROM categories";
            // Створення PreparedStatement
            PreparedStatement preparedStatement = conn.prepareStatement(selectQuery);

            // Виконати SQL-запит
            ResultSet resultSet = preparedStatement.executeQuery();

            List<CategoryItem> list = new ArrayList<>();
            // Обробляємо ResultSet
            while (resultSet.next()) {
                CategoryItem category = new CategoryItem();

                // Отримати дані з поточного рядка
                category.setId(resultSet.getInt("id"));
                category.setName(resultSet.getString("name"));
                category.setDescription(resultSet.getString("description"));
                list.add(category);
            }

            // Закрити ресурси
            resultSet.close();
            preparedStatement.close();
            return list;
        }
        catch(Exception ex) {
            System.out.println("Помилка читання списку даних: "+ex.getMessage());
            return null;
        }
    }

    // Метод сортування масиву об'єктів Person
    private static void sortPerson() {
        // Створення масиву об'єктів Person
        Person[] list = {
                new Person("Іван","Мельник"),
                new Person("Мальвіна","Морква"),
                new Person("Петро","Підкаблучник"),
                new Person("Олег","Гризун"),
        };
        System.out.println("---Звичайни список--");
        for (var item : list) {
            System.out.println(item);
        }
        // Сортування масиву
        Arrays.sort(list);
        System.out.println("---Сортований список--");
        for (var item : list) {
            System.out.println(item);
        }
    }

    // Метод роботи з простими масивами
    private static void simpleArray() {
        Scanner scanner = new Scanner(System.in);
        int n = 10;
        int []mas = new int[10];
        for (int i=0;i<n;i++)
            mas[i]=getRandom(-5, 30);

        System.out.println("\n---Звичайний масив---");
        for(int item : mas) {
            System.out.printf("%d\t",item);
        }
        // Сортування масиву
        Arrays.sort(mas);
        System.out.println("\n---Відсортований масив масив---");
        for(int item : mas) {
            System.out.printf("%d\t",item);
        }
        int count=0;
        for (int item : mas) {
            if(item>=0)
                count++;
        }
        System.out.println("\nКількість додатніх чисел: "+count);
    }


    // Метод генерації випадкового числа в заданому діапазоні
    private static int getRandom(int min, int max) {
        // Створення екземпляра класу Random
        Random random = new Random();
        // Генеруємо випадкове значення від min до max
        return random.nextInt(max - min) + min;
    }

    // Метод отримання даних користувача
    public static void inputData() {
        Scanner input = new Scanner(System.in);
        System.out.println("Як Вас звать?");
        String name = input.nextLine();
        System.out.println("Привіт "+name+"!");
    }
}