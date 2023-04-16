import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';
import {Comment} from './';
import styles from '../styles/home.module.css';
import { addComment, addRemoveLike } from '../api';
import { usePosts } from '../hooks';
import { useAuth } from '../hooks';
const Post = ({post}) => {
  const [comment,setComment] = useState('');
  const {addToast} = useToasts();
  const posts = usePosts();
  const auth = useAuth();
  const enterKeyPressed =  (e) => {
    // console.log(comment);

      if (e.charCode === 13 && comment.length !== 0) {
        
        handleAddComment();
        return ;
        
      } 
  }

  const handleAddComment = async () => {
    
    const response = await addComment(post._id,comment);
        // console.log(response);
        if(response.success){
          // console.log(response);
          setComment('');
          posts.addNewComment(post._id,response.data.comment);
          addToast('Comment added successfully',{
            appearance:'success'
          });
        }
        else{
          addToast(response.message,{
            appearance:'error'
          })
        }
  } 


  const handlePostLike = async () => {
    const response = await addRemoveLike(post._id,'Post');
    // console.log(response);
    if(response.success){
      posts.toggleLikePost(auth.user._id,post._id,response.data.deleted); 
      if(response.data.deleted){
        addToast('Like removed successfully',{
          appearance:'success'
        });
      } 
      else{
        addToast('Like added successfully',{
          appearance:'success'
        });
      }   
    }
    else{
      addToast(response.message,{
        appearance:'error'
      })
    }
  }

    return (<div className={styles.postWrapper} key={`post-${post._id}`}>
    <div className={styles.postHeader}>
      <div className={styles.postAvatar}>
        <img
          src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
          alt="user-pic"
        />
        <i class="fa-solid fa-user-hair"></i>
        {/* <i class="fi fi-sr-user"></i> */}
        <div>
          <Link to={{
            pathname:`/user/${post.user._id}`,
            state:{
              user:post.user
            },
          }} className={styles.postAuthor} >{post.user.name}</Link>
          <span className={styles.postTime}>a minute ago</span>
        </div>
      </div>
      <div className={styles.postContent}>{post.content}</div>

      <div className={styles.postActions}>
        <div className={styles.postLike} >
          <img
            src="./images/like.jpeg"
            alt="likes-icon"
            onClick={handlePostLike}
          />
          <span>{post.likes.length}</span>
        </div>

        <div className={styles.postCommentsIcon}>
          <img
            src="./images/comment.jpeg"
            alt="comments-icon"
          />
          <span>{post.comments.length}</span>
        </div>
      </div>
      <div className={styles.postCommentBox}>
        <input key={`${post._id}`} value={comment}  placeholder="Start typing a comment" onKeyPress={enterKeyPressed}  onChange={(e) => setComment(e.target.value)} />
      </div>

      
      <div className={styles.postCommentsList}>
        {
            post.comments.map((comment) => (
                <Comment comment={comment} postId={post._id} key={`comment-${comment._id}`}/>
            ))
        }

      </div>
    </div>
  </div>);
}

Post.propTypes = {
    post : PropTypes.object
}


export default Post;
