import express, { Request, Response } from 'express';

const port = 5000;
const app = express();


app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT http://localhost:${port}`);
});
