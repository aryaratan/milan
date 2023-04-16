import { createContext } from 'react';
import { useProvidePosts } from '../hooks';

const initialState = {
  posts:[],
  updatePosts: ()=>{},
  addNewComment: ()=>{},
  toggleLikePost: ()=>{},
  toggleLikeComment: ()=>{},
  loading: true
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = useProvidePosts();

  return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>;
};
