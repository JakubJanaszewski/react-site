import { createContext, useState, useEffect} from 'react';

const UtilityContext = createContext({
    engines: [],
    countries: [],
});

export function UtilityContextProvider(props) {
    const [engines, setEngines] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch(
        `http://localhost:8000/meta/engines`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
            else{
                console.log("ERROR WHILE GETTING ENGINE TYPES")
            }
        }).then((json) => {
            setEngines(json);
        });
    },[])
    
    useEffect(() => {
        fetch(
        `http://localhost:8000/meta/countries`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
            else{
                console.log("ERROR WHILE GETTING COUNTRIES NAMES")
            }
        }).then((json) => {
            setCountries(json);
        });
    },[])

    const context = {
        engines: engines,
        countries: countries,
    };

    return (
        <UtilityContext.Provider value={context}>
            {props.children}
        </UtilityContext.Provider>
    );
}

export default UtilityContext;