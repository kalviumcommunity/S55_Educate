import Dresss from '../assets/Dresss.jpeg'
function Dress() {
  return (
    <div>
      <SearchBar />
      <div className="content">
        <h1>Welcome to WiFa</h1>
        <p>Find your choice here.</p>
        <div className="image-container">
          <img src={Dresss} alt="" />
          <div className="image-description">
            <p>The dress is white and made of a semi-translucent material. The wearer is also sporting white sneakers for a casual touch. An elaborate gray accessory or headpiece adorns their head.</p>
          </div>
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