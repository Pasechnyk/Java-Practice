import './App.css'
import CategoryListPage from "./category/list/CategoryListPage.tsx";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/default/DefaultLayout.tsx";
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./category/edit/CategoryEditPage.tsx";
import ProductCreatePage from "./product/create/ProductCreatePage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<DefaultLayout/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path={"category"}>
                        <Route path = "create" element={<CategoryCreatePage/>}/>
                        <Route path = "edit/:id" element={<CategoryEditPage/>}/>
                        <Route path = "add-product" element={<ProductCreatePage/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
