import { useState } from "react";
import styles from "../styles/profile.module.css";
import {useAuth} from "../hooks";
import { useToasts } from "react-toast-notifications";

const Profile = () => {

    const auth = useAuth();
    const [name,setName] = useState(auth.user?.name?auth.user.name:'');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editMode,setEditMode] = useState(false);
    const [savingForm,setSavingForm] = useState(false);
    const {addToast} = useToasts();

    

    const updateProfile = async (e)=>{
        setSavingForm(true);
        let error = false;
        if(!name || !password || !confirmPassword){
            addToast("Please enter all fields",{
                appearance :'error'
            });
            error = true;
        }

        if(password !== confirmPassword){
            addToast("Password does not matches",{
                appearance :'error'
            });
            error = true;
        }

        if(error){
            return setSavingForm(false);
        }

        const response = await auth.updateUser(auth.user._id,name,password,confirmPassword);
        console.log('profile', response);
        if(response.success){
            addToast("Successfully updated",{
                appearance :'success'
            });
            setPassword('');
            setConfirmPassword('');
            setEditMode(false);
        }
        else{
            addToast(response.error,{
                appearance :'error'
            });
        }
        setSavingForm(false);
        return ;
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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving profile...' : 'Save profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
    )

}

export default Profile;