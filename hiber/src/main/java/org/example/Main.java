package org.example;

import org.example.models.Category;
import org.example.models.Image;
import org.example.models.Product;
import org.example.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        menu();
        //AddProduct();
        //ShowProducts();
    }

    private static void menu() {
        int action=0;
        Scanner in = new Scanner(System.in);
        do {
            System.out.println("0.Вихід");
            System.out.println("1.Додати категорію");
            System.out.println("2.Додати товар");
            System.out.println("3.Показати всі категорії");
            System.out.println("4.Показати всі товари");
            System.out.println("5.Редагувати категорію");
            System.out.println("6.Редагувати товар");
            System.out.println("7.Видалити категорію");
            System.out.println("8.Видалити товар");
            System.out.print("->_");
            action=in.nextInt();
            switch(action) {
                case 1: {
                    AddCategory();
                    break;
                }
                case 2: {
                    AddProduct();
                    break;
                }
                case 3: {
                    ShowCategories();
                    break;
                }
                case 4: {
                    ShowProducts();
                    break;
                }
                case 5: {
                    EditCategories();
                    break;
                }
                case 6: {
                    EditProduct();
                    break;
                }
                case 7: {
                    DeleteCategories();
                    break;
                }
                case 8: {
                    DeleteProduct();
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
            System.out.print("Вкажіть кількість зображень: ");
            int numImages = in.nextInt();
            List<Image> images = new ArrayList<>();
            for (int i = 0; i < numImages; i++) {
                Image image = new Image();
                System.out.printf("Вкажіть URL для зображення: ", i + 1);
                image.setUrl(in.next());
                image.setProduct(product);
                images.add(image);
            }
            product.setImages(images);

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
            System.out.println("Вкажіть ID категорії для редагування: ");
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
                System.out.println("Категорію успішно відредаговано!");

            } else { System.out.println("Категорію не знайдено!"); }
            context.getTransaction().commit();
        }
    }

    private static void EditProduct() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            System.out.println("Вкажіть ID товару для редагування: ");
            int productId = in.nextInt();
            Product product = context.get(Product.class, productId);
            if (product != null) {
                System.out.println("Вкажіть нову назву: ");
                String newName = in.next();
                System.out.println("Вкажіть новий опис: ");
                String newDescription = in.next();
                System.out.println("Вкажіть нову ціну: ");
                double newPrice = in.nextDouble();
                System.out.print("Вкажіть кількість зображень: ");
                int numImages = in.nextInt();
                List<Image> images = new ArrayList<>();
                for (int i = 0; i < numImages; i++) {
                    Image image = new Image();
                    System.out.printf("Вкажіть URL для нового зображення: ", i + 1);
                    image.setUrl(in.next());
                    image.setProduct(product);
                    images.add(image);
                }

                product.setImages(images);
                product.setName(newName);
                product.setDescription(newDescription);
                product.setPrice(newPrice);

                context.update(product);
                System.out.println("Товар успішно відредаговано!");

            } else { System.out.println("Товар не знайдено!"); }
            context.getTransaction().commit();
        }
    }

    private static void DeleteCategories() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try (Session context = sf.openSession()) {
            context.beginTransaction();
            System.out.println("Вкажіть ID категорії для видалення: ");
            int categoryId = in.nextInt();
            Category category = context.get(Category.class, categoryId);
            if (category != null) {
                context.delete(category);
                System.out.println("Категорію успішно видалено!");

            } else { System.out.println("Категорію не знайдено!"); }
            context.getTransaction().commit();
        }
    }

    private static void DeleteProduct() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try (Session context = sf.openSession()) {
            context.beginTransaction();
            System.out.println("Вкажіть ID товару для видалення: ");
            int productId = in.nextInt();
            Product product = context.get(Product.class, productId);
            if (product != null) {
                context.delete(product);
                System.out.println("Товар успішно видалено!");

            } else { System.out.println("Товар не знайдено!"); }
            context.getTransaction().commit();
        }
    }


}