import React from 'react';

const ClaimInit = () => {
  function search(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query");
    console.log(`You searched for '${query}'`);
    
  }

  return (
    <div>
      <form onSubmit={search}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default ClaimInit;


// <form action={search}>