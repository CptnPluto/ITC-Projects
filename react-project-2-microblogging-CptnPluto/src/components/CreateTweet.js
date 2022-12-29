import "./ComponentCSS.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

//Firebase imports
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

//------------------//

const CreateTweet = ({ onSubmit }) => {
    const { user } = useAuthContext();
    const [tweetText, setTweetText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Boolean to check if the tweet is empty or too large.
    const isDisabled =
        tweetText.length === 0 || tweetText.length > 140 || isLoading;

    // Create tweet obj with content, date and userID.
    const createTweet = () => {
        try {
            const newDate = new Date();
            const date = newDate.toJSON();

            const newTweet = {
                content: tweetText,
                date: date,
                userID: user.uid,
            };
            return newTweet;
        } catch (err) {
            console.log("Error creating tweet obj: ", err);
        }
    };

    // On submit, create tweet obj send it to Firestore.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTweet = createTweet();

        try {
            setIsLoading(true);
            await addDoc(collection(db, "tweets"), newTweet);
        } catch (err) {
            console.log(err);
        }
        setTweetText("");
        setIsLoading(false);
    };

    return (
        <form>
            <div className="tweet-container">
                <textarea
                    type="text"
                    value={tweetText}
                    placeholder="What you have in mind..."
                    onChange={(e) => setTweetText(e.target.value)}
                />
                <button
                    disabled={isDisabled}
                    id="tweet"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Tweet
                </button>
                {tweetText.length > 140 && (
                    <div className="error">
                        <p>The tweet can't contain more than 140 chars.</p>
                    </div>
                )}
            </div>
        </form>
    );
};

export default CreateTweet;
