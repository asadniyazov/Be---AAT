import React, { useEffect, useState } from 'react'

function Home() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/user")
   
  }, []);
  return (
    <div>
      <h1>This is Home Page</h1>
    </div>
  )
}

export default Home
