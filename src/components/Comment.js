import { addRemoveLike } from '../api';
import styles from '../styles/home.module.css';
import { useToasts } from 'react-toast-notifications';
import { useAuth ,usePosts} from '../hooks';

const Comment = ({ comment ,postId}) => {

    const auth = useAuth();
    const posts = usePosts();
    const {addToast} = useToasts();

    const handleCommentLike = async () => {
        console.log(postId);
        const response = await addRemoveLike(comment._id,'Comment');
        if(response.success){
            posts.toggleLikeComment(auth.user._id,postId,comment._id,response.data.deleted); 
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

    return (
        <div className={styles.postCommentItem}>
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <div className={styles.commentLike}>
                    <img
                        src="./images/like.jpeg"
                        alt="likes-icon"
                        onClick={handleCommentLike}
                    />
                    <span className={styles.postCommentLikes} >{comment.likes.length}</span>

                </div>
            </div>

            <div className={styles.postCommentContent}>{comment.content}</div>
        </div>

    )
}

export default Comment;