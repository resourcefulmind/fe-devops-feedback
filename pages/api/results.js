import { Redis } from "@upstash/redis";

const resultsHandler = async (req, res) => {

    // To retrieve our data from our Redis backend
    const redis = new Redis({
        url: 'https://us1-helpful-bluejay-38304.upstash.io', 
        token: 'AZWgACQgNzQ3MDg4YjQtNzM3NC00MDQyLWI0YjItOTMzY2JjOTg0MTM0OTgyOGIxZTk0MTdmNDBjY2FhYTdmZmY4NDMwZmZjMTQ=', 
    });

    try {
        // Look for all feedback entries in a set for a user
        const entries = await redis.smembers("entries");

        // Get all feedback entries by id using pipeline cmd for multiple queries
        const p = redis.pipeline();
        entries.forEach((id) => {
            p.hgetall(id);
        });
        const results = await p.exec();

        return res.status(200).json({
            success: true, 
            message: "Data retrieved successfully", 
            data: results, 
        })
    } catch (error) {
        console.error("Failed to retrieve data from Redis", error);

        return res.status(500).json({
            success: false, 
            message: "Failed to retrieve data from Redis", 
        })
    }
};

export default resultsHandler