import React, { useState } from 'react';

const App = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const [user, setUser] = useState(null);
  let [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchUsername === "") {
      setErr("Please Enter Username")
      return;
    }
    if (searchUsername.trim() !== '') {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${searchUsername}`);
        const data = await response.json();
        console.log(data)
        setUser(data);
        setErr("")

      } catch (error) {
        console.log('Error fetching data:', error);
        setErr("No data found");
      } finally {
        setIsLoading(false);
      }
    }
  };

  function clear() {
    setSearchUsername("")
    setUser(null)
    setErr("")
  }
  return (

    <div className='main'>
      <div className='search'>
        <input
          type="text"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={handleSearch}>Search User</button>
        <button onClick={clear}>Reset</button>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <span>Loading...</span>
        </div>
      ) : (
        user && (
          <div className='container'>
            <img src={user.avatar_url} alt={user.login} />
            <h4><strong>Name: </strong> {user.name}</h4>
            <h4><strong> User Name: </strong>  {user.login}</h4>
            <span><strong>Followers: </strong> {user.followers} </span>
            <span><strong> Following: </strong> {user.following}</span>
            <p><strong>Public Repositories: </strong> {user.public_repos}</p>
            <button><a href={user.html_url}>Go to Profile</a></button>
          </div>

        )
      )}

      <div>
        {err !== "" && <h1 style={{ color: "red" }}>{err}</h1>}
      </div>
    </div>
  );

};

export default App;
