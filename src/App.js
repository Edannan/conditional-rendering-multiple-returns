import { useEffect, useState } from 'react';
import './App.css';

const url = 'https://api.github.com/users/Edannan';

function App() {
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [user, setUser] = useState({login:'default user', name:'', avatar_url:''});

useEffect(()=>{
  fetch(url)
  .then((data)=>{
    if (data.status >= 200 && data.status <= 299) {
    return data.json();
    }else{
      setLoading(false);
      setError(true);
    }
  })
  .then((gituser)=>{
    const{login, name, avatar_url} = gituser;
    setUser({...user, login, name, avatar_url});
    setLoading(false);

  })
  .catch((error)=>{
    console.log(error);
  })
},[])

if(loading)
return (
  <div className="profile container">
    <div className="profile">
      <h1>Loading...</h1>
    </div>
  </div>
)
else if(error)
    return (
    <div className="profile container">
      <div className="profile">
        <h1>Error...</h1>
      </div>
    </div>
  );

  return (
    <div className="profile container">
      <div className="profile">
        <img src={user.avatar_url} alt="avi"/>
        <h1>{user.login}</h1>
        <h1>{user.name}</h1>
      </div>
    </div>
  )
}

export default App;
