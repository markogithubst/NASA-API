
import './App.css';
import { useEffect, useState } from "react";

import { fetchData } from "./services/fetchData";

function Data(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // zahtjev se šaljem jedanput nakon prvog renderiranja
    useEffect(() => {
        // fetchData('http://frodo.ess.hr/api/nasa-planetary.php', setData, setError);
		fetchData('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', setData, setError);
    }, []);
    
    if (error) {
        return <div>{error}</div>;
    }
    
      if (!data) {
        return <div>Loading NASA data</div>;
    }

    const { title, url, explanation } = data;

    return (<div>
        <h1 className="nameOfTheStars">{title}</h1>
        <img className="imageNightSky" src={url} alt={title} />
        <p className="textExplanation" >{explanation}</p>
    </div>);
}

export default Data;