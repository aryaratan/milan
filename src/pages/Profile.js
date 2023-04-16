import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { Loader } from '../components';
import styles from '../styles/profile.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { addFriend, getUser,removeFriend } from '../api';
// import { any } from 'prop-types';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(false);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return navigate('/');
      }

      setLoading(false);
    };

    fetchUser();
  }, [userId, navigate, addToast]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const user = auth.user;
    
    if(user){ 
      // console.log('profile',user);
      const friends = user.friendships;
      // console.log('friends',friends);
      const friendIds = friends?.map((friend) =>  friend.to_user._id);
      const index = friendIds.indexOf(userId);
      if(index !== -1){
        return true;
      }
    }

   
    return false;
  };

  const handleAddFriendClick = async () => {
    setRequest(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      addToast('Friend added successfully!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequest(false);
  }


  const handleRemoveFriendClick = async () => {
    setRequest(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend removed successfully!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequest(false);
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriendClick}>
          {request ? 'Removing friend...' : 'Remove friend'}
        </button>
        ) : (
          <button className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick}>
            {request ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;











// import styles from "../styles/profile.module.css";
// import { useParams } from "react-router-dom";
// import { useState , useEffect } from "react";
// import {getUser} from "../api";
// import { useToasts } from "react-toast-notifications";
// import {useAuth} from "../hooks";
// import {Loader} from "../components";

// const Profile = () => {
//     const [user,setUser] = useState({});
//     const [loading,setLoading] = useState(false);
//     const {userId} = useParams();
//     const {addToast} = useToasts();
//     const auth = useAuth();
//     // console.log(auth.user);
//     const chechIfUserIsAFriend = () => {
//       console.log('array' ,auth.user);
//       if(auth.user.friendships){
//          const friends =  auth.user.friendships;
//         console.log(auth.user);
//         const friendsId = friends.map(friend => friend.to_user._id);

//         let index = friendsId.indexOf(userId);

//         if(index !== -1){
//           return false;
//         }  
//       }
      
//       return true;
//     }


//     useEffect(()=> {
//         setLoading(true);
//         const fetchUser = async () => {
//             const response = await getUser(userId);
//             // console.log(response);
//             if(response.success){
//                 setUser(response.data.user);
//             }else{
//                 addToast(response.error, {
//                     appearance : 'error'
//                 });
//                 // return history.push("/");
//             }
//         }
//         fetchUser();
//         setLoading(false);
//         return ;
//     },[userId,addToast])


//     // if(loading){
//     //   return (<Loader/>);
//     // }
//     return (
//         <div className={styles.settings}>
//       <div className={styles.imgContainer}>
//         <img
//           src="../images/user-pic.jpeg"
//           alt=""
//         />
//       </div>

//       <div className={styles.field}>
//         <div className={styles.fieldLabel}>Email</div>
//         <div className={styles.fieldValue}>{user.email}</div>
//       </div>

//       <div className={styles.field}>
//         <div className={styles.fieldLabel}>Name</div>
        
//           <div className={styles.fieldValue}>{user.name}</div>
       
//       </div>

      

//       <div className={styles.btnGrp}>
        
//           {/* <> */}
//           {
//             chechIfUserIsAFriend() ? 
//             <button
//               className={`button ${styles.saveBtn}`}
             
//             >
//               Add Friend
//             </button>
//             :
//             <button
//             className={`button ${styles.editBtn}`}
           
//           >
//           Remove Friend
//           </button>
//           }
            
           
//           {/* </> */}
        
//       </div>
//     </div>
//     )

// }

// export default Profile;