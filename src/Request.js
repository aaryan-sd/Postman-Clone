// Request.js
import React, { useState } from 'react';
import axios from 'axios';
import './Request.css'; // Import the corresponding CSS file

const Request = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [body, setBody] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('headers');

  const [responseDetails, setResponseDetails] = useState({
    status: null,
    time: null,
    size: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSendRequest = () => {
    setLoading(true); // Set loading to true when sending the request

    const startTime = new Date();

    axios({
      method,
      url,
      // headers: headers && JSON.parse(headers),
      data: body && JSON.parse(body),
    })
      .then((response) => {
        const endTime = new Date();
        const elapsedTime = endTime - startTime;

        console.log('Full Response:', response);

        const status = response.status;
        const time = `${elapsedTime} ms`;
        const size = `${JSON.stringify(response.data).length} bytes`;

        setResponseDetails({
          status,
          time,
          size,
        });

        setResponseData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
        console.error('Full Error Object:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request is complete
      });
  };

  return (
    <>
    <div className="request-container">
      
      {/* First Line: Method Dropdown, URL Input, Send Request button */}
      <div className="first-line">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="method-dropdown"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />

        <button
          className="send-button"
          onClick={handleSendRequest}
        >
          Send
        </button>
      </div>

      
      {/* Tab Buttons */}
      <div className="tab-buttons">
        <span
          style={{ paddingLeft:'10px' , cursor: 'pointer', textDecoration: selectedTab === 'headers' ? 'underline' : 'none', fontWeight: selectedTab === 'headers' ? 'bold' : 'normal', color: selectedTab === 'headers' ? '#ff6201' : 'white' }}
          onClick={() => setSelectedTab('headers')}
        >
          Headers
        </span>
        <span
          style={{ paddingLeft:'25px', cursor: 'pointer', textDecoration: selectedTab === 'body' ? 'underline' : 'none', fontWeight: selectedTab === 'body' ? 'bold' : 'normal', color: selectedTab === 'body' ? '#ff6201' : 'white' }}
          onClick={() => setSelectedTab('body')}
        >
          Request Body
        </span>
      </div>

      {/* Content Based on Selected Tab */}
      {selectedTab === 'headers' && (
        <div>
          <label className="label">
            <span className="label-text"></span>
            <input
              type="text"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="input"
            />
          </label>
        </div>
      )}

      {selectedTab === 'body' && (
        <div>
          <label className="label">
            <span className="label-text"></span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="input"
            />
          </label>
        </div>
      )}

        

      
    </div>

      {/* Response Box */}
      <div className="response-box">
      <h3>Response:</h3>
      {loading ? (
          <p>Loading...</p>
        ) : (
          responseData && (
            <div>
             <div className="response-details">
                <p>Status: {responseDetails.status}</p>
                <p>Time: {responseDetails.time}</p>
                <p>Size: {responseDetails.size}</p>
            </div>
            <div className='response-body-table'>
              <h4>Response Body:</h4>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Request;
