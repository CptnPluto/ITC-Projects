import "./Pages.css";
import { useCollection } from "../hooks/useCollection";
import CreateTweet from "../components/CreateTweet";
import TweetFeed from "../components/TweetFeed";

const Home = () => {
    // Set up a listener for the tweets collection.
    const { documents: userTweets } = useCollection("tweets");

    return (
        <>
            <CreateTweet />
            <TweetFeed tweets={userTweets} />
        </>
    );
};

export default Home;
