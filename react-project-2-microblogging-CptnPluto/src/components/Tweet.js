import "./ComponentCSS.css";
import { useEffect, useState } from "react";

//Firebase imports
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

//------------------//

const Tweet = ({ tweet, onClick }) => {
    const [username, setUsername] = useState();
    const [profileImg, setProfileImg] = useState();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userSnap = await getDoc(doc(db, "users", tweet.userID));
                const username = await userSnap.data().displayName;
                const photoURL = await userSnap.data().photoURL;
                setUsername(username);
                setProfileImg(photoURL);
            } catch (err) {
                console.log("Getting username error: ", err);
            }
        };

        getUserInfo();
    }, []);

    return (
        <li className="tweet">
            <div className="tweet-header">
                <div className="username">{username}</div>
                <div className="delete" onClick={onClick}>
                    X
                </div>
            </div>
            <img className="profileImg" src={profileImg} alt="Profile Pic" />
            <div className="text">{tweet.content}</div>
        </li>
    );
};

export default Tweet;
