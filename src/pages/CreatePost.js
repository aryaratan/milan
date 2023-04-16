import { useState } from 'react';
import Styles from '../styles/home.module.css';
import {addPost} from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';

const CreatePost = () =>{

    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false); 
    const {addToast} = useToasts();
    const posts = usePosts();

    const handleClickEvent = async ()=>{
        setLoading(true);

        if(post){
            const response = await addPost(post);

            if(response.success){
                setPost('');
                posts.updatePosts(response.data.post);
                addToast('Post added successfully',{
                    appearance :'success'
                });
                // console.log(response.data);
            }
            else{
                addToast(response.message,{
                    appearance:'error'
                })
            }

        }
        else{
            addToast('Add some content',{
                appearance:'error'
            })
        }
        setLoading(false);
    }

    return (
        <div className={Styles.inputDiv}>
            <textarea className={Styles.inputArea} placeholder='type here ....' value={post} onChange={(e)=>setPost(e.target.value)} />        
            <div>
                <button className={Styles.btn} onClick={handleClickEvent}>
                    {
                        loading
                        ? ' Adding Post...'
                        :
                        ' Create Post'
                    } </button>
            </div>
        </div>
    )
}

export default CreatePost;