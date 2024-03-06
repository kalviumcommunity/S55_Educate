import { useState } from 'react';
import './EntityForm.css'; 

function EntityForm({ fetchedData, onSubmit }) {
  const [formData, setFormData] = useState({
    entityName: fetchedData.Entity || '',
    property1: '',
    property2: '',
    property3: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      entityName: fetchedData.Entity || '',
      property1: '',
      property2: '',
      property3: '',
      rating: ''
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="entityName">Entity Name:</label>
          <input
            type="text"
            id="entityName"
            name="entityName"
            value={formData.entityName}
            onChange={handleChange}
            disabled={!!fetchedData.Entity} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="property1">Property 1:</label>
          <input
            type="text"
            id="property1"
            name="property1"
            value={formData.property1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="property2">Property 2:</label>
          <input
            type="text"
            id="property2"
            name="property2"
            value={formData.property2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="property3">Property 3:</label>
          <input
            type="text"
            id="property3"
            name="property3"
            value={formData.property3}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EntityForm;
