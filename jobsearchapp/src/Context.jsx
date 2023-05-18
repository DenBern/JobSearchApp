import React, { useState } from "react";

import { Main } from "./components/pages/Main/Main";

export const Context = React.createContext();

export const MainContextProvider = () => {

    const [catalogValue, setCatalogValue] = useState(null);
    const [paymentFrom, setPaymentFrom] = useState(null);
    const [paymentTo, setPaymentTo] = useState(null);
    const [activeFilters, setActiveFilters] = useState(false);
    
    return (
        <Context.Provider
            value={
                {
                    catalogValue,
                    setCatalogValue,
                    paymentFrom,
                    setPaymentFrom,
                    paymentTo,
                    setPaymentTo,
                    activeFilters,
                    setActiveFilters,
                }
            }
        >
            {<Main/>}
        </Context.Provider>
    )  
}

