import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./view/HomeView";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView/>} index={true}/>
            </Routes>
        </BrowserRouter>
    )
}
