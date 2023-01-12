import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: 'https://us1-helpful-bluejay-38304.upstash.io', 
    token: 'AZWgACQgNzQ3MDg4YjQtNzM3NC00MDQyLWI0YjItOTMzY2JjOTg0MTM0OTgyOGIxZTk0MTdmNDBjY2FhYTdmZmY4NDMwZmZjMTQ=', 
});

const submitHandler = async (req, res) => {
    const body = req.body;

    //Assemble relevant data to be put in database
    const data = {
        rating: String(body.rating) || "0", 
        recommendation: String(body.recommendation) || "false", 
        recommendationNetScore: String(body.recommendationNetScore) || "0", 
        commentLikeMost: String(body.commentLikeMost) || "", 
        commentEnjoyWatchingMost: String(body.commentEnjoyWatchingMost) || "", 
        commentSpecificTopics: String(body.commentSpecificTopics) || "", 
        commentChanges: String(body.commentChanges) || "", 
        commentChallenges: String(body.commentChallenges) || "", 
        commentOtherChannels: String(body.commentOtherChannels) || "", 
        commentOtherThoughts: String(body.commentOtherThoughts) || "", 
    }

    //Generate a random id to store the feedback entries under
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    //Insert data into Upstash redis
    try {
        //Store the data from channel feedback
        await redis.hset(`entries:${id}`, data);

        //Store the id of the feedback to retrieve it later
        await redis.sadd("entries", `entries:${id}`);
    } catch (error) {
        console.error("Failed to insert data into redis", error);

        return res.status(500).json({
            success: false, 
            message: "Failed to insert data into redis", 
        })
    }

    return res.status(200).json({
        success: true, 
        message: "Data inserted successfully", 
    });

}

export default submitHandler;

