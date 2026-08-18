import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import AppLayout from "./layouts/AppLayout";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route element={<HomeView/>} index={true}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
