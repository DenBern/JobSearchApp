import { useState } from 'react';

export const Search = (props) => {
    const {updateVacancy, updatePage} = props;
    const [search, setSearch] = useState('');

    const handlesearch = () => {
        updatePage(1)
        updateVacancy(search)
    }

    return (
    <div style={{display: "flex", flexDirection: "row", gap: "1vw"}}>
        <input 
            type="text"
            placeholder="Search vacancy"
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
        <button
            style={{backgroundColor: "green"}}
            onClick={handlesearch}
        >Start search</button>
    </div>
    );
}