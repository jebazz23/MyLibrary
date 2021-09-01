const express = require('express');
const router = express();
const multer = require('multer');
const path = require('path');
const Book = require('../models/book');
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg','image/png','image/gif']
const Author = require('../models/author');
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, )
    }
});

// All Books Route
router.get('/', async (req, res) => {
    res.send('All Books')
});

// New Book route
router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        })
    } catch {
        res.redirect('/books');
    }
});

// Create Book route
router.post('/', upload.single('cover'), async (req, res) => {
    req.fileName != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    });
    try {
        const newBook = await book.save();
        res.redirect('books');
    } catch {
        
    }
});

module.exports = router;