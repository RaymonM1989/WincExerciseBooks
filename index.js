import express from 'express';
import 'dotenv/config';
import booksRouter from './routes/books.js';
import recordsRouter from './routes/records.js';
import loginRouter from './routes/login.js';



const app = express();
app.use(express.json());

app.use('/books', booksRouter);
app.use('/records', recordsRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => 
    {
        res.send("Hello World!");
    });

app.get('/about', (req, res) => {
    const html = '<h1>About Us</h1><p>Welcome to our website!</p>';
    res.send(html);
  });

app.listen(3000, () =>
{
    console.log("Server is listening on port 3000");
});