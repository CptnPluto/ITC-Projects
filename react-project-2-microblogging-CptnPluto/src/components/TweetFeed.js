import Tweet from "./Tweet";
import "./ComponentCSS.css";

// Firebase imports
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

//------------------//

const TweetFeed = ({ tweets }) => {
    // Delete tweet on click
    const handleClick = async (id) => {
        const docRef = doc(db, "tweets", id);
        await deleteDoc(docRef);
    };

    return (
        <div className="tweet-feed">
            <ul>
                {tweets &&
                    tweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweet={tweet}
                            onClick={() => handleClick(tweet.id)}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default TweetFeed;
