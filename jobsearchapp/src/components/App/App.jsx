import { useEffect, useCallback } from "react";
import { Search } from "../Search/Search";
import { HeaderMenu } from "../Header/Header";
import { SuperJob } from "../../service/SuperJob";

import "./App.css";

export const App = () => {
    const {getVacancies} = SuperJob();
    
    useEffect(() => {
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