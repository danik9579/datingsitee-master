import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IoMailOutline } from "react-icons/io5";
import { BiLockOpenAlt } from "react-icons/bi";
import jwt_decode from 'jwt-decode';
import ISuccesfullLoginData from '../../models/ISuccesfullLoginData';
import { ActionType } from '../../redux/action-type';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
    let [userName , setUserName] = useState("");
    let [password , setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onLogin() {
      try {
        const response = await axios.post("http://localhost:8080/users/login", {userName , password});
        // console.log(response);
        let token: string = response.data;
        let decodedToken: any = jwt_decode(token);
        let strSuccessfulLoginResponse: string = decodedToken.sub;
        let successfulLoginResponse: ISuccesfullLoginData = JSON.parse(strSuccessfulLoginResponse);
        dispatch({type: ActionType.setUserDetails , payload: {successfulLoginResponse}});
        console.log(successfulLoginResponse);
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        if (successfulLoginResponse){
            navigate('/');
        }
      } catch (e: any) {
        console.error(e)
        if(e.response?.data?.errorMessage){
          let message = e.response.data.errorMessage;
          alert(message);
        }else{
        let message = "Login failed, please try later";
        alert(message);
        }
      }
    }
  return (
    <div className="login">
    <div className="form-box">
        <div className="form-value">
          <h2 className="h2">Login</h2>
          <div className="inputbox">
            <IoMailOutline className="icon"/>
            <input type="text" required onChange={(event) => setUserName(event.target.value)}/>
            <label>Email</label>
          </div>
          <div className="inputbox">
            <BiLockOpenAlt className="icon"/>
            <input type="password" required onChange={(event) => setPassword(event.target.value)}/>
            <label>Password</label>
          </div>
          <div className="forget">
            <label ><input type="checkbox"/>Remember Me  <a className="forget-href" href="#">Forget Password</a></label>        
          </div>
            <button className="button" onClick={onLogin}>Log in</button>
            <div className="register">
              <p>Don't have a account? <Link to="/registration" >Sign up</Link></p>
            </div>
       </div>
   </div>
  </div>
    
  )
}

export default Login