import express from 'express';
import auth from '../middleware/auth.js';
import getBooks from '../services/books/getBooks.js';
import getBookById from '../services/books/getBookById.js';
import createBook from '../services/books/createBook.js';
import updateBookById from '../services/books/updateBookById.js';
import deleteBook from '../services/books/deleteBook.js';

const router = express.Router();

    router.get('/', (req, res) =>
    {
        try
        {
            const { genre, available } = req.query;
            const books = getBooks(genre, available);
            return res.status(200).json(books);
        }
        catch (error)
        {
            console.error(error);
            return res.status(500).send("Something went wrong while getting list of books!");
        }
    });
    
    router.post('/', auth, (req, res) =>
        {
            try
            {
                const { title, author, isbn, pages, available, genre } = req.body;
                const newBook = createBook(title, author, isbn, pages, available, genre);
                return res.status(201).json(newBook);
            }
            catch (error)
            {
                console.error(error);
                return res.status(500).send('Something went wrong while creating the new book!');
            }
        });
    
    router.get('/:id', (req, res) =>
    {
        try
        {
            const { id } = req.params;
            const book = getBookById(id);
    
            if (!book)
            {
                return res.status(404).send(`Book with ID ${id} was not found!`);
            }
            else
            {
                return res.status(200).json(book);
            }
        }
        catch (error)
        {
            console.error(error);
            return res.status(500).send("Something went wrong while getting book by ID!");
        }
    });
    
    router.put('/:id', auth, (req, res) =>
    {
        try
        {
            const { id } = req.params;
            const { title, author, isbn, pages, available, genre } = req.body;
            const updatedBook = updateBookById(id, title, author, isbn, pages, available, genre);
            return res.status(200).json(updatedBook);
        }
        catch (error)
        {
            console.error(error);
            return res.status(500).send('Something went wrong while updating this book!');
        }
    });
    
    router.delete('/:id', auth, (req, res) =>
    {
        try
        {
            const { id } = req.params;
            const deletedBookId = deleteBook(id);
    
            if (!deletedBookId)
            {
                return res.status(404).send(`Book with ID ${id} was not found!`);
            }
            else
            {
                return res.status(200).json( { message: `Book with ID ${deletedBookId} was deleted!` } );
            }
        }
        catch (error)
        {
            console.error(error);
            return res.status(500).send('Something went wrong while deleting that book!');
        }
    });

    export default router;