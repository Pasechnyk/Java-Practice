package org.example;

import org.example.models.Category;
import org.example.models.Product;
import org.example.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.sql.ResultSet;
import java.util.Calendar;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        //menu();
        //AddProduct();
        ShowProducts();
    }

    private static void menu() {
        int action=0;
        Scanner in = new Scanner(System.in);
        do {
            System.out.println("0.Вихід");
            System.out.println("1.Додати");
            System.out.println("2.Показати всі");
            System.out.println("3.Редагувати");
            System.out.println("4.Видалити");
            System.out.print("->_");
            action=in.nextInt();
            switch(action) {
                case 1: {
                    AddCategory();
                    break;
                }
                case 2: {
                    ShowCategories();
                    break;
                }
                case 3: {
                    EditCategories();
                    break;
                }
                case 4: {
                    DeleteCategories();
                    break;
                }
            }
        }while(action!=0);
    }
    private static void AddProduct() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try (Session context = sf.openSession()) {
            context.beginTransaction();
            Product product = new Product();
            System.out.print("Вкажіть назву: ");
            product.setName(in.nextLine());
            System.out.print("Вкажіть опис: ");
            product.setDescription(in.nextLine());
            System.out.print("Вкажіть ID категорії: ");
            Category category = new Category();
            category.setId(in.nextInt());
            product.setCategory(category);
            System.out.print("Вкажіть ціну: ");
            product.setPrice(in.nextDouble());
            context.save(product);
            context.getTransaction().commit();
        }
    }
    private static void AddCategory() {
        Calendar calendar = Calendar.getInstance();
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            Category category = new Category();
            System.out.println("Вкажіть назву: ");
            category.setName(in.nextLine());
            System.out.println("Вкажіть фото: ");
            category.setImage(in.nextLine());
            category.setDateCreated(calendar.getTime());
            context.save(category);
            context.getTransaction().commit();
        }
    }

    private static void ShowProducts() {
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            List<Product> list = context.createQuery("from Product", Product.class)
                    .getResultList();
            for (Product product : list) {
                System.out.println("Товар: " + product);
            }
            context.getTransaction().commit();
        }
    }
    private static void ShowCategories() {
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            List<Category> list = context.createQuery("from Category", Category.class)
                    .getResultList();
            for (Category category : list) {
                System.out.println("Категорія: " + category);
            }
            context.getTransaction().commit();
        }
    }

    private static void EditCategories() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            System.out.println("Вкажіть ID категорії: ");
            int categoryId = in.nextInt();
            Category category = context.get(Category.class, categoryId);
            if (category != null) {
                System.out.println("Вкажіть назву: ");
                String newName = in.next();
                System.out.println("Вкажіть фото: ");
                String newImage = in.next();

                category.setName(newName);
                category.setImage(newImage);

                context.update(category);
                System.out.println("Успішно відредаговано!");

            } else { System.out.println("Категорію не знайдено!"); }
            context.getTransaction().commit();
        }
    }

    private static void DeleteCategories() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try (Session context = sf.openSession()) {
            context.beginTransaction();
            System.out.println("Вкажіть ID категорії: ");
            int categoryId = in.nextInt();
            Category category = context.get(Category.class, categoryId);
            if (category != null) {
                context.delete(category);
                System.out.println("Успішно видалено!");

            } else { System.out.println("Категорію не знайдено!"); }
            context.getTransaction().commit();
        }
    }
}