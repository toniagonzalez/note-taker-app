const express = require('express');
const router = express.Router();
const db = require('./database');

router.get('/', (req, res) => {
    res.json( {"message":"Welcome to note-taker-app!"}) 
})

//get all notes
router.get('/notes', (req, res) => {
    let sql = 'SELECT * FROM notes';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error" : err.message});
            return;
        }
        res.json({
            "data":rows
        })
    })
})

//get note by id
router.get('/notes/:id', (req, res) => {
    let sql = 'SELECT * FROM notes WHERE id = ?';
    let params = [req.params.id];
    db.get(sql, params, (err, row) =>{
        if (err) {
            res.status(400).json({"error" : err.message});
            return;
        }
        res.json({
            "data" : row
        })
    })
})

//add notes
router.post('/notes', (req, res) => {
    let data = {
        title: req.body.title,
        message: req.body.message,
    }
    let sql = 'INSERT INTO notes (title, message) VALUES (?,?)';
    let params = [data.title, data.message];
    db.run(sql, params, (err, result) =>{
        if (err) {
            res.status(400).json({"error" : err.message});
            return;
        }
        //Return HTTP 201 'content created'
        res.status(201).end();      
    })
})

// //edit notes
router.patch('/notes/:id', (req, res) => {
    let data = {
        title: req.body.title,
        message: req.body.message,
    }
    db.run(
        `UPDATE notes SET 
             title = COALESCE(?,title), 
             message = COALESCE(?,message)
             WHERE id = ?`,
        [data.title, data.message, req.params.id],
        function(err, result){
            if (err){
                res.status(400).json({"error" : res.message})
                return;
            }
            //Return HTTP 200 'ok'
            res.status(200).end();
        }
    )
})

// //delete notes
router.delete('/notes/:id', (req, res) => {
    db.run(
        `DELETE FROM notes WHERE id = ?`,
        [req.params.id],
        function (err, result){
            if (err){
                res.status(400).json({"error" : res.message})
                return;
            }
            //Return HTTP 204 'confirmation with no content'
            res.status(204).end();
    })
})

module.exports = router;