import { Outlet } from "react-router-dom";


export default function DeckLayout() {
    return (
        <>
            <div>DeckLayout</div>

            <div>
                <Outlet/>
            </div>
        </>
    )
}
