
import {BrowserRouter as Router , Route, Routes,redirect} from 'react-router-dom';
import {Home,Login , Profile, Signup, Setting} from '../pages'
import {Navbar,Error} from './';
import ProtectedRoute from "../Routes";


// function PrivateRoute(children , ...rest) {
//   const auth = useAuth();

//   return (
//     <Route {...rest}
//      render = {() => {
//       if(auth.user){
//         return (children);
//       }
//       else{
//         return (<redirect to="/login"/>)
//       }
//      }}
//     />
//   )
// }

function App() {

  // const [posts,setPosts] = useState([]);
  // const [loading,setLoading] = useState(true);
// const auth = useAuth();

  // useEffect(() => {
  //   const fetchPost = async ()=>{
  //     const response = await getPosts();
  //     if(response.success){
  //       setPosts(response.data.posts);
  //       setLoading(false);
  //       console.log(response.data.posts);
  //     }
  //     // console.log('response' , response.data.posts);
  //   }

  //   fetchPost();
  // },[]);

  
  return (
    <div className="App">
      <Router>
        
      <Navbar />
        <Routes>
          <Route  path="/" element={<Home posts = {[]} />} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/signup" element={<Signup/>} />
          {/* <PrivateRoute  path="/profile" element={<Profile/>} /> */}
          <Route
                exact
                path="/setting"
                element={
                  <ProtectedRoute>
                    <Setting />
                  </ProtectedRoute>
                }
          />
          <Route
                exact
                path="/user/:userId"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
          />

        <Route  element={<Error/>} /> 
        </Routes>
        
        
      </Router>
     
    </div>
  );
}

export default App;
