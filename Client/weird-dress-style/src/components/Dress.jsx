import { useState, useEffect } from 'react';
import axios from 'axios';


function Dress() {
  const [dresses, setDresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('https://s55-educate-3.onrender.com/get');
        setDresses(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchDresses();
  }, []);

  const handleSearch = () => {
    console.log('Search term:', searchTerm);

  };

  return (
    <div>
      <div className="search-bar">
        <input
          className='search-space'
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="content">
        <h1>Welcome to WiFa</h1>
        <p>Find your choice here.</p>
        <div className="dress-container">
          {dresses && dresses.map((dress, index) => (
            <div key={dress._id} className={`dress-card ${index === 0 ? 'first-image' : ''}`}>
              <img src={dress.img} alt="" className="dress-image" />
              <div className="dress-info">
                <p>{dress.Entity}</p>
                <p>{dress.Property1}</p>
                <p>{dress.Property2}</p>
                <p>{dress.Property3}</p>
                <p>{dress.Rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dress;
