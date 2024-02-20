import React, { useState, useEffect } from 'react';
import axios from 'axios';

// React app для відображення списку категорій
const Categories = () => {
    // Стан для зберігання списку категорій
    const [categories, setCategories] = useState([]);

    // Ефект для отримання списку категорій після завантаження компонента
    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                // Зберігаємо отримані дані у стан
                setCategories(response.data);
            })
            .catch(error => {
                // Виводимо помилку у консоль
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <div>
            <h2>Категорії</h2>
            <ul>
                {/* Відображаємо кожну категорію як пункт списку */}
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;

