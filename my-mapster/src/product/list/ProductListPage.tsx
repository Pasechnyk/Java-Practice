import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProductItem, IGetProduct } from "./types.ts";
import http_common from "../../http_common.ts";

const ProductListPage = () => {
    // Стан для зберігання списку товарів
    const [products, setProducts] = useState<IGetProduct>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0
    });

    // Ефект, який викликається після завантаження компонента
    useEffect(() => {
        // Виконуємо запит до сервера для отримання списку товарів
        http_common.get<IGetProduct>("/api/products")
            .then(resp => {
                // Встановлюємо список товарів у стан компонента
                setProducts(resp.data);
            })
            .catch(error => {
                console.log("Error fetching products", error);
            });
    }, []);

    // Повертаємо верстку сторінки
    return (
        <div>
            <h1>Список товарів</h1>
            {/* Посилання для додавання нового товару */}
            <Link to="/product/create">Додати продукт</Link>
            <ul>
                {products.content.map((product: IProductItem) => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <span>{product.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductListPage;

