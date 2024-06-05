import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'


function Home() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const token = Cookies.get('token')
    console.log(token);

    fetch('http://localhost:3000/user', { headers: { Authorization: `${token}` } })
      .then(response => response.json())
      .then(data => setdata(data))
      .catch(err => console.log(err))

  }, []);
  return (
    <div>
      <h1>This is Home Page</h1>
      <div>
        {data.map((x) => <div key={x._id}>
          <ul>
            <li>{x.email}</li>
            <li>{x.password}</li>
          </ul>
        </div>)}
      </div>
    </div>
  )
}

export default Home
