const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
        return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(200).json(books);
});

public_users.get('/books',function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
      resolve(res.status(200).json(books))
    })
    getBooks.then(console.log("Success (10)"))
  });
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    return res.status(200).json(books[isbn]);
 });

 public_users.get('books/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn

    const getBookDetails = new Promise((resolve, reject)=> {
        resolve(res.status(200).json(books[isbn]))
    });
    getBookDetails.then("Success (11)")
 });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = decodeURIComponent(req.params.author.toLowerCase())
  const result = Object.values(books).filter((book)=>{
    if (book["author"].toLowerCase() == author) return book
    })
  return res.status(200).json(result);
});

public_users.get('/author/:author',function (req, res) {
  const author = decodeURIComponent(req.params.author.toLowerCase())
  const result = Object.values(books).filter((book)=>{
    if (book["author"].toLowerCase() == author) return book
    })


    const getBookByAuthor= new Promise((resolve, reject)=> {
        resolve(res.status(200).json(result))
    })  
    getBookByAuthor.then("Success (12)")

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = decodeURIComponent(req.params.title.toLowerCase())
    const result = Object.values(books).filter((book)=>{
      if (book["title"].toLowerCase() == title) return book
      })
  return res.status(200).json(result);
});

public_users.get('books/title/:title',function (req, res) {
    const title = decodeURIComponent(req.params.title.toLowerCase())
    const result = Object.values(books).filter((book)=>{
        if (book["title"].toLowerCase() == title) return book
        })

    const getBookByTitle = new Promise((resolve, reject)=> {
        res.status(200).json(result)
    });
    getBookByTitle.then("Success (13)")
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;