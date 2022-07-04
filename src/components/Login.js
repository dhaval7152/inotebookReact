import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({email:"",password:""});
  let navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credentials.email,password:credentials.password }),
    });
    const json = await response.json();
    console.log(json);

    if(json.success){
      //Save the AuthTOken and redirect 
      localStorage.setItem('token',json.authtoken);
      navigate("/")
    }
    else{
      alert("Invalid Credentials");
    }

  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form>
        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}

            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <sub>ex-abc@gmail.com</sub>
        </div>
        <div className="form-group">
          <label className="mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control mb-3"
            id="password"
            value={credentials.password}
            onChange={onChange}
            name="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
