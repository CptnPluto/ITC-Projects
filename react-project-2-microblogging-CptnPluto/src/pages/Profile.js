import "./Pages.css";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useStorage } from "../hooks/useStorage";

//Firebase imports
import { getDoc, doc, setDoc } from "firebase/firestore";

//------------------//

const Profile = () => {
    const { user, handleProfileEdit } = useAuthContext();
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    const [loading, setLoading] = useState(false);
    const { upload } = useStorage();

    //Image upload
    useEffect(() => {
        if (user?.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    // Upload new photo
    const handleUpload = async (e) => {
        e.preventDefault();
        const type = e.target.value;

        setLoading(true);
        const useableURL = await upload(photo, user);
        setLoading(false);

        await localEdit(useableURL, type);
    };

    //Username change
    const handleSave = async (e) => {
        e.preventDefault();
        const type = e.target.value;

        await handleProfileEdit(inputRef.current.value);
        await localEdit(inputRef.current.value, type);
        alert("Profile updated");
    };

    //New test localEdit
    const localEdit = async (text, type) => {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (type === "save") {
                await setDoc(userRef, {
                    ...userSnap.data(),
                    displayName: text,
                });
            }
            if (type === "upload") {
                await setDoc(userRef, {
                    ...userSnap.data(),
                    photoURL: text,
                });
            }
        } catch (err) {
            console.log("Error in setupUsername:", err);
        }
    };

    // Reference to the input field - essentially getElementById.
    const inputRef = useRef();

    const [color, setColor] = useState('white');

    const changeColor = (color) => {
        setColor(color);
    }

    return (
        <>
            <form className="profile-form">
                <h1>Profile</h1>
                <div className="sample" style={{backgroundColor:`${color}`}}>THIS IS MY EXAMPLE</div>
                <img src={photoURL} alt="Profile Img" className="profileImg" />

                <br></br>
                <h3 className="email">{user.email}</h3>

                <label htmlFor="username">User Name</label>
                <input
                    ref={inputRef}
                    type="text"
                    id="username"
                    defaultValue={user.displayName}
                />
                <button type="submit" onClick={handleSave} value="save">
                    Save
                </button>

                <label htmlFor="profileImg">Upload Image</label>
                <input type="file" id="username" onChange={handleFileChange} />
                <button
                    disabled={loading || !photo}
                    type="submit"
                    value="upload"
                    onClick={handleUpload}
                >
                    Upload
                </button>
                <button type="button" onClick={() => changeColor('blue')}>Change background to red</button>
                
            </form>
        </>
    );
};

export default Profile;
