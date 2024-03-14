import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dress() {
  const [dresses, setDresses] = useState([]);

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

  const handleNewDress = (newDress) => {
    setDresses(prevDresses => [...prevDresses, newDress]);
  };

   return (
    <div>
      <div className="content">
        <h1>Welcome to WiFa</h1>
        <p>Find your choice here.</p>

      
      <Link to="/dressform">
          <button>Find here</button>
        </Link>


        <div className="dress-container">
          {dresses && dresses.map((dress, index) => (
            <div key={index} className={`dress-card ${index === 0 ? 'first-image' : ''}`}>
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
