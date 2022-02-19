import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { id: users.length + 1, name: name, email: email };
    if (nameRef.current.value === "" && emailRef.current.value === "") {
      alert("Please enter a name and email");
    }
    // send data to the server
    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const addedUser = data;
        console.log(data);
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
        // reset name and email
        nameRef.current.value = "";
        emailRef.current.value = "";
      });

    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Found {users.length}</h1>
      <form
        action=""
        onSubmit={handleAddUser}
        style={{ background: "red", padding: "5px" }}
      >
        <input ref={nameRef} type="text" name="name" placeholder="Name" />
        <input type="email" name="" ref={emailRef} id="" placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id}: {user.name} {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
