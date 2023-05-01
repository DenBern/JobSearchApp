import { useState } from 'react';

export const Search = (props) => {
    const {updateVacancy} = props;
    const [search, setSearch] = useState('');

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
            onClick={() => updateVacancy(search)}
        >Start search</button>
    </div>
    );
}