import { useEffect } from "react";
import { Search } from "../Search/Search";
import { HeaderMenu } from "../Header/Header";
import { SuperJob } from "../../service/SuperJob";

import "./App.css";

export const App = () => {
    const {getAccessToken, getCatalogues, getVacancies} = SuperJob();
    
    useEffect(() => {
        getAccessToken();
        getCatalogues();
        getVacancies();
    }, [])
    
    return (
        <>
            <HeaderMenu />
            <main>
                <div className="filters" />
                <div className="search-content">
                    <Search />
                </div>
            </main>
        </>
    )
}