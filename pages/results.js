import { useEffect, useState } from "react";

import styles from '../styles/Results.module.css';

export default function Results() {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        fetch("/api/results")
            .then((res) => res.json())
            .then((response) => setFeedbackData(response.data));
    }, []);

    return (
        <div className={styles.container}>
            {feedbackData.map((data) => (
                <div key={data.id}>
                    <p>
                        <strong>Rating: </strong> {data.rating}
                    </p>
                    <p>
                        <strong>Recommendation: </strong> {data.recommendation}
                    </p>
                    <p>
                        <strong>Likely To Recommend: </strong> {data.recommendationNetScore}
                    </p>
                    <p>
                        <strong>Video Liked The Most: </strong> {data.commentLikeMost}
                    </p>
                    <p>
                        <strong>Videos Enjoyed Watching The Most When Browsing Similar Channels: </strong> {data.commentEnjoyWatchingMost}
                    </p>
                    <p>
                        <strong>Specific Topics Or Themes To See In Future Videos: </strong> {data.commentSpecificTopics}
                    </p>
                    <p>
                        <strong>Changes Or Improvements To Suggest For The Channel: </strong> {data.commentChanges}
                    </p>
                    <p>
                        <strong>Challenges Faced While Watching Videos: </strong> {data.commentChallenges}
                    </p>
                    <p>
                        <strong>Content Creation Platforms To Recommend: </strong> {data.commentOtherChannels}
                    </p>
                    <p>
                        <strong>Other Suggestion: </strong> {data.commentOtherThoughts}
                    </p>
                </div>
            ))}
        </div>
    );
}
