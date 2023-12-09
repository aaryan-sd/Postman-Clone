// App.js
import React, { useState } from 'react';
import Header from './Header';
import Request from './Request';
import Response from './Response';

const App = () => {
  //const [responseData, setResponseData] = useState(null);

  return (
    <div>
      <Header />
      <Request />
      <Response />
    </div>
  );
};

export default App;
