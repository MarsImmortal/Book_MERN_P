import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(243).send('Welcome to the mern stack project');
});


mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
        console.log('listening on port ' + PORT);
    });
})
.catch((err) => {
    console.log('error connecting to mongodb', err);
});
