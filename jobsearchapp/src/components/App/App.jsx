import { Search } from "../Search/Search";
import { HeaderMenu } from "../Header/Header";

import "./App.css";
import { useEffect } from "react";
import { SuperJob } from "../../service/SuperJob";

export const App = () => {

    const {getAccessToken} = SuperJob();

    useEffect(() => {
        getAccessToken();
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