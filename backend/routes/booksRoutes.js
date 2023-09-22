import express from 'express';

import {Book} from '../models/bookModel.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({message : 'Missing required fields'});
        }
        const newBook = 
        {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({count : books.length, data : books});
    } catch (error) {
        console.log(error);
        res.send(500).send({message : error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id.length);

        if (id.length != 24) {
            return res.status(400).json({ message: 'Invalid book id' });
        }
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error(error); // Changed to console.error for better error tracking
        res.status(500).json({ message: error.message }); // Changed .sendStatus to .status and added .json
    }
});
 

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title |
            !req.body.author |
            !req.body.publishYear) 
            {
            return res.status(400).send({message : 'Missing required fields'});
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id , req.body);

        if (!result) 
        {
            return res.status(404).send({message : 'Book not found'});
        }
        return res.status(200).send({message : 'Book updated successfully'}); 
        }
    catch (err) {
        console.log(err);
        res.status(500).send({message : err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        } 
        // Send a 204 (No Content) response, as no content is expected in a successful delete operation.
        res.status(204).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;