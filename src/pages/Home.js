import styles from '../styles/home.module.css';
import { useEffect, useState } from 'react';
import { useAuth  , usePosts} from '../hooks';
import { Loader ,FriendsList ,Post} from '../components';
import { useNavigate,Link } from 'react-router-dom';
import { LOCALSTORAGE_TOKEN_KEY as token , getItemFromLocalStorage } from '../utils';
import { CreatePost } from '.';
import { useToasts } from 'react-toast-notifications';

// import  from '../components/FriendsList';


const Home = () => {

  const posts = usePosts();
  const auth = useAuth();
  const navigate = useNavigate();
  
  const {addToast} = useToasts();
  
  useEffect(() => {
    
    if(getItemFromLocalStorage(token)){
      // console.log("present");
        navigate("/");
    }else{
        // console.log(" not present");

        navigate("/login");
    }

    // document.addEventListener('keypress',)
  },[]);


  

  if(posts.loading){
    return <Loader/>
  }

  return (
    
    <div className={styles.Home}>
      <CreatePost/>
    
      <div className={styles.postsList}>
      {
        posts.data.map((post) => (
          
          <Post post={post} key = {`post-${post._id}`}/>
        )
      )
       }
    </div>
       {auth.user && <FriendsList/>}
    </div> 
  );
};


// if multiple props are send and we have to check there type


export default Home;
