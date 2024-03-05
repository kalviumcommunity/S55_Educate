import { useState, useEffect } from 'react';
import axios from 'axios';
import Dresss from '../assets/Dresss.jpeg';

function Dress() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://s55-educate-3.onrender.com/get');
      setEntities(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  return (
    <div>
      <SearchBar />
      <div className="content">
        <h1>Welcome to WiFa</h1>
        <p>Find your choice here.</p>
        <div className="image-container">
          <img src={Dresss} alt="" />
          {entities.map(entity => (
            <div key={entity.id} className="image-description">
              <p>{entity.description}</p>
              {/* Render other attributes of the entity */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="search-bar">
      <input className='searchspace' type="text" placeholder="Search..." />
      <button>Search</button>
    </div>
  );
}

export default Dress;
