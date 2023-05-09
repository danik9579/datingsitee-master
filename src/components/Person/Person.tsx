import React from 'react'
import "./Person.css";
import IPerson from '../../models/IPerson';
import { IoFemale } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import axios from 'axios';
import { ActionType } from '../../redux/action-type';

function Person(props: IPerson) {
  const mainUser = useSelector((state: AppState) => state.userDetails);
  const dispatch = useDispatch();
  
  async function likeAPerson(props: IPerson){
    let userId:number = props.id;
    try{
      debugger;
      let url = `http://localhost:8080/users/liked?mainUser=${mainUser.id}&liked=${userId}`;
      let response = await axios.post(url); 
      dispatch({type: ActionType.SaveUsersList, payload: {userId}});
  }
  catch(e){
      console.error(e);
      alert("Failed to retrieve coupons");
  }
  }



  return (
    <div className='person'>
        <div className="image">
          <img className='image-box' src="https://www.safetyfirstaid.co.uk/images/products/large/SS8027S.jpg" alt="" />
        </div>
        <div className="details">
            <div>Nickname: {props.nickName}</div>
            <div>Age: {props.age}</div>
            <div>{props.gender == 'Male' && props.gender && <IoFemale/>}</div>
        </div>
        <div className="buttons">
            <AiFillHeart className='button' onClick={() => likeAPerson(props)}></AiFillHeart>
            <AiOutlineClose className='button'></AiOutlineClose>
        </div>
    </div>
  )
}

export default Person