import {Link} from "react-router-dom";
import { useState,useEffect } from "react";
import styles from '../styles/navbar.module.css';
import {searchUsers} from '../api';
import { useAuth } from "../hooks";

const Navbar = () =>{

  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

    return (
        <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://cdn.vectorstock.com/i/1000x1000/77/17/word-milan-logo-design-vector-32097717.webp"
            className={styles.logo}
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && <div className={styles.user}>
          <Link to="/setting">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>{auth.user.name}</span>
        </div>
        }
        <div className={styles.navLinks}>
          <ul>
            {
              auth.user ? 
              <>
              <li onClick={auth.logout}>
                <Link to="/login">Log out</Link>
              </li>
              </>
              :
              <>
              <li >
              
                <Link to="/login">Log in</Link>
              </li>
              <li >
                <Link to="/signup">register</Link>
              </li>
              </>
            }
            
          </ul>
        </div>
      </div>
    </div>
    );
}

export default Navbar;