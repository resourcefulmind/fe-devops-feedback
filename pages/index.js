import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      rating: form.rating.value, 
      recommendation: form.recommendation.value, 
      recommendationNetScore: form.recommendationNetScore.value, 
      commentLikeMost: form.commentLikeMost.value, 
      commentEnjoyWatchingMost: form.commentEnjoyWatchingMost.value, 
      commentSpecificTopics: form.commentSpecificTopics.value, 
      commentChanges: form.commentChanges.value, 
      commentChallenges: form.commentChallenges.value, 
      commentOtherChannels: form.commentOtherChannels.value, 
      commentOtherThoughts: form.commentOtherThoughts.value, 
    }

    //to send data to the backend
    await fetch("/api/submit", {
      body: JSON.stringify(data), 
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json", 
      }, 
      method: "POST", 
    });

    alert("Thank you for your feedback!");
  };

  const RatingOption = ({ value }) => (
    <div>
      <input type="radio" name="rating" value={value} required/>{" "}
      <label>{value}</label>
    </div>
  );

  const RecommendationOption = ({ value }) => (
    <div>
      <input type="radio" name="recommendationNetScore" value={value} required/>{" "}
      <label>{value}</label>
    </div>
  );

  return (
    <>
      <Head>
        <title>Frontend DevOps Channel Feedback</title>
        <meta name="description" content="Give your feedback on what you think about the channel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container} onSubmit={handleSubmit}>
          <form className={inter.className}>
            <div>
              <label>1. On a scale of 1-10 with 1 being “Very Poor” and 10 being “Excellent”, how would you rate the channel and its content?</label>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <RatingOption key={value} value={value} />
              ))}
            </div>

            <div>
              <label>2. Would you recommend this channel to your friend/colleague?</label>
              <div>
                <input type="radio" name="recommendation" value="true" required />{" "}
                <label>Yes</label>
              </div>
              <div>
                <input type="radio" name="recommendation" value="false" required />{" "}
                <label>No</label>
              </div>
            </div>

            <div>
              <label>3. How likely are you to recommend this channel to your friend/colleague?</label>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <RecommendationOption key={value} value={value} />
              ))}
            </div>

            <div>
              <label>4. What specific video do you like the most on the channel?</label>
              <textarea name='commentLikeMost' placeholder='The video I liked the most is...'></textarea>
            </div>

            <div>
              <label>5. What kind of videos do you enjoy watching the most when you browse through channels like mine?</label>
              <textarea name='commentEnjoyWatchingMost' placeholder='The kind of videos I like watching the most when I browse through YT channels are...'></textarea>
            </div>

            <div>
              <label>6. Are there any specific topics or themes you would like to see covered in future videos?</label>
              <textarea name='commentSpecificTopics' placeholder='I would like to see more of...' ></textarea>
            </div>

            <div>
              <label>7. Are there any changes or improvements you would suggest for the channel?</label>
              <textarea name='commentChanges' placeholder='Your answer...' ></textarea>
            </div>

            <div>
              <label>8. Are there any challenges you currently face while watching my videos?</label>
              <textarea name='commentChallenges' placeholder='Your answer...' ></textarea>
            </div>

            <div>
              <label>9. Are there any other content creator channels you can recommend for me to watch and learn from?</label>
              <textarea name='commentOtherChannels' placeholder='Your answer...' ></textarea>
            </div>

            <div>
              <label>10. Is there any other thing you would like to say?</label>
              <textarea name='commentOtherThoughts' placeholder='Your answer...' ></textarea>
            </div>


            <input type="submit" />
          </form>
        </div>
      </main>
    </>
  )
}
