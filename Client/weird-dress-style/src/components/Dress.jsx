// import React from 'react';

function Dress() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Welcome to Our Website</h1>
        <p>Find your choice here.</p>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-logo">
        
        </div>
        <ul className="navbar-links">
           </ul>
        <SearchBar />
      </div>
    </nav>
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
