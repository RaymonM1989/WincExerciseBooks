import express from 'express';
import getRecords from '../services/records/getRecords.js';
import getRecordById from '../services/records/getRecordById.js';
import createRecord from '../services/records/createRecord.js';
import updateRecordById from '../services/records/updateRecordById.js';
import deleteRecord from '../services/records/deleteRecord.js';

const router = express.Router();

router.get('/', (req, res) =>
{
    try
    {
        const { artist, genre, available } = req.query;
        const records = getRecords(artist, genre, available);
        res.status(200).json(records);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send("Something went wrong while getting list of records!");
    }
});

router.post('/', (req, res) =>
{
    try
    {
        const { title, artist, year, available, genre } = req.body;
        const newRecord = createRecord(title, artist, year, available, genre);
        res.status(201).json(newRecord);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Something went wrong while creating the new record!');
    }
});

router.get('/:id', (req, res) =>
{
    try
    {
        const { id } = req.params;
        const record = getRecordById(id);

        if (!book)
        {
            res.status(404).send(`Book with ID ${id} was not found!`);
        }
        else
        {
            res.status(200).json(record);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Something went wrong while getting record by ID!');
    }
});

router.put('/:id', (req, res) =>
{
    try
    {
        const { id }= req.params;
        const { title, artist, year, available, genre } = req.body;
        const updatedRecord = updateRecordById(id, title, artist, year, available, genre);
        res.status(200).json(updatedRecord);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Something went wrong while updating this record!');
    }
});

router.delete('/ :id', (req, res) =>
{
    try
    {
        const { id } = req.params;
        const deletedBookId = deleteRecord(id);

        if (!deletedBookId)
        {
            res.status(404).send(`Record with ID ${id} was not found!`);
        }
        else
        {
            res.status(200).json( { message: `Record with ID ${deletedBookId} was deleted!` } );
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Something went wrong wile deleting that record!');
    }
});