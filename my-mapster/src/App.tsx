import './App.css'
import CategoryListPage from "./category/list/CategoryListPage.tsx";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/default/DefaultLayout.tsx";
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./category/edit/CategoryEditPage.tsx";
import Register from "./authorization/Register";
import Login from "./authorization/Login";
import AdminLayout from "./containers/admin/AdminLayout.tsx";
// import ProductCreatePage from "./product/create/ProductCreatePage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<DefaultLayout/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path={"category"}>
                        <Route path = "create" element={<CategoryCreatePage/>}/>
                        <Route path = "edit/:id" element={<CategoryEditPage/>}/>
                        {/*<Route path = "add-product" element={<ProductCreatePage/>}/>*/}
                    </Route>
                </Route>

                <Route path={"login"} element={<Login/>}/>
                <Route path={"register"} element={<Register/>}/>

                <Route path={"/admin"} element={<AdminLayout/>}>
                    <Route path={"category"}>
                        <Route index element={<CategoryListPage/>}/>
                        <Route path={"create"} element={<CategoryCreatePage/>}/>
                        <Route path={"edit/:id"} element={<CategoryEditPage/>}/>
                    </Route>
                </Route>

            </Routes>
        </>
    )
}

export default App
