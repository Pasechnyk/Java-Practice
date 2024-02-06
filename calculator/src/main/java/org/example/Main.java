package org.example;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        menu();
    }
    // Меню з вибором операції
    private static void menu() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Простий калькулятор");
        System.out.println("1. Додавання (+)");
        System.out.println("2. Віднімання (-)");
        System.out.println("3. Множення (*)");
        System.out.println("4. Ділення (/)");
        System.out.println("5. Вихід");

        // Отримати вибір користувача
        System.out.print("Введіть цифру: ");
        int choice = scanner.nextInt();

        // Виконати операцію згідно з вибором
        switch (choice) {
            case 1:
                addition();
                break;
            case 2:
                subtraction();
                break;
            case 3:
                multiplication();
                break;
            case 4:
                division();
                break;
            case 5:
                System.out.println("Вихід...");
                break;
            default:
                System.out.println("Неправильний символ,спробуйте ще раз.");
        }
    }

    // Метод додавання
    private static void addition() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введіть перше число: ");
        double num1 = scanner.nextDouble();
        System.out.print("Введіть друге число: ");
        double num2 = scanner.nextDouble();
        double result = num1 + num2;
        System.out.println("Результат: " + result);
    }

    // Метод віднімання
    private static void subtraction() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введіть перше число: ");
        double num1 = scanner.nextDouble();
        System.out.print("Введіть друге число: ");
        double num2 = scanner.nextDouble();
        double result = num1 - num2;
        System.out.println("Результат: " + result);
    }

    // Метод множення
    private static void multiplication() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введіть перше число: ");
        double num1 = scanner.nextDouble();
        System.out.print("Введіть друге число: ");
        double num2 = scanner.nextDouble();
        double result = num1 * num2;
        System.out.println("Результат: " + result);
    }

    // Метод ділення
    private static void division() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введіть перше число: ");
        double numerator = scanner.nextDouble();
        System.out.print("Введіть дільник: ");
        double denominator = scanner.nextDouble();
        if (denominator == 0) {
            System.out.println("Помилка! Не можна ділити на нуль.");
        } else {
            double result = numerator / denominator;
            System.out.println("Результат: " + result);
        }
    }
}