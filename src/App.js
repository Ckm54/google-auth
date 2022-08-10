import { useEffect, useState } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode'

function App() {

  const[user, setUser] = useState({})

  function handleCallbackResponse(response) {
    console.log("Encoded jwt id token: " + response.credential);
    var user = jwt_decode(response.credential);
    console.log(user)
    setUser(user)
    document.getElementById('signInDiv').hidden = true
  }
  
  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    /* global google */
    const google = window.google
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse
      });
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
      )
      // display prompt to login
      google.accounts.id.prompt()
  }, []);

  // if no user show signin button else show logout button
  return (
    <div className="App">
      <div id='signInDiv'></div>
      {Object.keys(user).length !== 0 &&
      <button onClick={(e) => handleSignOut(e)}>SignOut</button>}
      {user && 
      <div>
        <img src={user.picture} alt="username" />
        <h3>{user.name}</h3>
      </div>
      }
    </div>
  );
}

export default App;
