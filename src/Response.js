// Response.js
import React from 'react';

const Response = ({ responseData }) => {
  return (
    <div>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
};

export default Response;
