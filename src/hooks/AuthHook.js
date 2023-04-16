import { useContext, useState,useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { login as userLogin ,updateProfile as editUser, getFriends } from '../api';
import { LOCALSTORAGE_TOKEN_KEY, getItemFromLocalStorage ,setItemInLocalStorage,removeItemFromLocalStorage} from '../utils';
import {AuthContext} from '../providers';


export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    
    const getUserDetails = async () =>{
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      // console.log(userToken);
      if(userToken){
        const user = jwtDecode(userToken);

        const response = await getFriends();
        let friendships = [];
        if(response.success){
          friendships = response.data.friends;
          // console.log('data', response.data);
        }
        // else{
        //   friendships = [];
        // }
        // console.log('friendships', friendships);
        // let newUser = {...user};
        // newUser.friendships = friendships;
        // console.log('new',newUser);

        setUser({
          ...user,
          friendships
        });


        // console.log('user',user);
        setLoading(false);
      }

    }
    getUserDetails();

  },[]) 

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editUser(userId, name, password, confirmPassword);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.token);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }

  }

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.token);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }

  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    
  };

  const updateUserFriends = (addFriend,friend ) => {
    if (addFriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
      return;
    }

    const newFriends = user.friendships.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );

    setUser({
      ...user,
      friendships: newFriends,
    });
  }

  return {
    user,
    login,
    logout,
    loading,
    updateUser,
    updateUserFriends
  };
};

