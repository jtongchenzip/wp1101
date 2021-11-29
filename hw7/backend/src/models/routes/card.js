import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv-defaults';
import ScoreCard from '../ScoreCard';

const router = express.Router()


router.post('/create-card', async function (req, res) {
    const existing = await ScoreCard.findOne( {'name' : req.body.name, 'subject': req.body.subject} );

    if ( existing ) {
        console.log("exist")
        updateScoreCard(req.body.name, req.body.subject, req.body.score);
        res.json( { message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: 1 })
    }
    else {
        console.log("not exist")
        addScoreCard(req.body.name, req.body.subject, req.body.score);
        res.json( { message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: 1 })
    }
})

router.delete('/clear-db', async function (req, res) {
    deleteDB();
    res.json( {message: "Database cleared" })
})

router.get('/query-cards', async function (req, res) {
    console.log(req.query.queryString)
    var queryResults = []
    if(req.query.type === 'name') {
        const cursor = ScoreCard.find({ 'name' : req.query.queryString }).cursor();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            // console.log(doc); // Prints documents one at a time
            queryResults.push(`${doc.name}'s ${doc.subject} score is: ${doc.score}`);
        }
    }
    else if(req.query.type === 'subject') {
        const cursor = ScoreCard.find({ 'subject' : req.query.queryString }).cursor();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            // console.log(doc); // Prints documents one at a time
            queryResults.push(`${doc.name}'s ${doc.subject} score is: ${doc.score}`)
        }
    }

    if(queryResults.length === 0) {
        res.json({ message: `${req.query.type} (${req.query.queryString}) not found!`})
    }
    else {
        res.json({ messages : queryResults}) 
    }
})

const updateScoreCard = async (name, subject, score) => {
    try {
        let doc = await ScoreCard.findOneAndUpdate({ name, subject }, {score}, { new: true })
        console.log("Updated Scorecard");
        // console.log(doc.subject);
        // console.log(doc.score);
    }
    catch (e) {
        throw new Error('ScoreCard update error: ' + e);
    }
};

const addScoreCard = async (name, subject, score) => {
    try {
        const newScoreCard = new ScoreCard({ name, subject, score });
        console.log("Created Scorecard");
        return newScoreCard.save();
    }
    catch (e) {
        throw new Error('ScoreCard creation error: ' + e);
    }
};

const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
    }
    catch (e) {
        throw new Error("Database deletion failed");
    }
};

export default router