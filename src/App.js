import React, { useState } from 'react';

const App = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchUsername.trim() !== '') {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${searchUsername}`);
        const data = await response.json();
        console.log(data)
        setUser(data);
       
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
  
    <div className='main'>
    <div className='search'>
      <input
        type="text"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>
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
  <p><strong> User Name: </strong>  {user.login}</p>
  <p><strong>Name: </strong> {user.name}</p>
  <p><strong>Bio: </strong> {user.bio}</p>
  <p><strong>Followers: </strong> {user.followers}</p>
  <p><strong>Following: </strong> {user.following}</p>
  <p><strong>Public Repositories: </strong> {user.public_repos}</p>
</div>

        )
      )}
    </div>
  );
  
};

export default App;
