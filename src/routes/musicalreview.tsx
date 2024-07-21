import React, { useState } from 'react';

const Pagination: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);

  const buttonStyle = {
    fontFamily: 'inter',
    color: '#A7A7A7',
    fontSize: '20px',
    cursor: 'pointer',
    marginRight: '10px', // Adjust margin-right for spacing between buttons
    border: 'none', // Remove default border
    background: 'none', // Remove default background
    padding: '5px 10px', // Optional: Add padding for better button appearance
  };

  const selectedButtonStyle = {
    color: '#E8E1B1',
    fontWeight: 'bold',
  };

  const containerStyle = {
    display: 'inline-flex', // Use inline-flex to remove white box
    backgroundColor: 'transparent', // Set background color to transparent
  };

  return (
    <div style={containerStyle}>
      <button style={{ ...buttonStyle, ...(current === 1 && selectedButtonStyle) }} onClick={() => setCurrent(1)}>1</button>
      <button style={{ ...buttonStyle, ...(current === 2 && selectedButtonStyle) }} onClick={() => setCurrent(2)}>2</button>
      <button style={{ ...buttonStyle, ...(current === 3 && selectedButtonStyle) }} onClick={() => setCurrent(3)}>3</button>
      <button style={{ ...buttonStyle, ...(current === 4 && selectedButtonStyle) }} onClick={() => setCurrent(4)}>4</button>
      <button style={{ ...buttonStyle, ...(current === 5 && selectedButtonStyle) }} onClick={() => setCurrent(5)}>5</button>
    </div>
  );
};

export default Pagination;
