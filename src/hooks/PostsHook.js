import { useContext, useState,useEffect } from 'react';
import {getPosts} from '../api';
import {PostsContext} from '../providers';


export const usePosts = () => {
    return useContext(PostsContext);
};

export const useProvidePosts = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPost = async ()=>{
            const response = await getPosts();
            if(response.success){
            setPosts(response.data.posts);
            setLoading(false);
            // console.log(response.data.posts);
            }
            // console.log('response' , response.data.posts);
        }
        
        fetchPost();
    },[]);

    const updatePosts = (post) => {
        setPosts([post , ...posts]);
    }

    const addNewComment = (postId,comment) => {
        const newPosts = posts.map((post)=>{
            if(post._id === postId){
                return {...post, comments:[comment,...post.comments]}
            }
            return post;
        });
        setPosts(newPosts);
    } 


    const toggleLikePost = (userId, postId,deletedLike) => {
        if(!deletedLike){
            const newPosts = posts.map((post)=>{
                if(post._id === postId){
                    // console.log(post);
                    return {...post,likes:[userId,...post.likes]}
                }
                return post;
            });
            setPosts(newPosts);
            return;
        }
        const newPosts = posts.map((post)=>{
            if(post._id === postId){
                // console.log(post);
                const newLikes = post.likes.filter(
                    (f) =>  f !== userId
                );
                return {...post,likes:newLikes}
            }
            return post;
        });
        
        return setPosts(newPosts);
    }

    const toggleLikeComment = (userId,postId, commentId,deletedLike) => {
        if(!deletedLike){
            const newPosts = posts.map((post)=>{
                if(post._id === postId){
                    // console.log(post);
                    const newComment = post.comments.map((comment)=>{
                        if(comment._id === commentId){
                            return {...comment,likes:[userId,...comment.likes]};
                        }
                        return comment;
                    })
                    return {...post,comments:newComment}
                }
                return post;
            });
            setPosts(newPosts);
            return;
        }
        const newPosts = posts.map((post)=>{
            if(post._id === postId){
                // console.log(post);
                const newComment = post.comments.map((comment)=>{
                    if(comment._id === commentId){
                        const newLikes = comment.likes.filter(
                            (f) =>  f !== userId
                        );
                        return {...comment,likes:newLikes};
                    }
                    return comment;
                })
                return {...post,comments:newComment};
            }
            return post;
        });
        
        return setPosts(newPosts);
    }

    return {
        data:posts,                 
        updatePosts,
        addNewComment,
        toggleLikePost,
        toggleLikeComment,
        loading
    }
}