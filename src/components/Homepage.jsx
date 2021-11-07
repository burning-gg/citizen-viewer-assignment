import React from 'react';

import SearchPanel from './SearchPanel';
import ShowPanel from './ShowPanel';
import Alert from './Alert';

const Homepage = () => {
  return (
    <div className='main-container'>
      <Alert />
      <SearchPanel />
      <ShowPanel />
    </div>
  );
};

export default Homepage;
