import express from "express";
import cors from "cors";
import 'dotenv/config';
import { MongoClient } from "mongodb";



const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const client = new MongoClient(process.env.MONGODB_SECRET_URI);
export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db("hireloop-db");



app.get("/", (req, res) => {
    res.send({ success: true, message: "Hire Loop Server is running..." });
});


if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
}



export default app;



