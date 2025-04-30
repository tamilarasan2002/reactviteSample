

const express = require('express');
const { verifyToken } = require('../config/verifyToken');
const { GetBooks, PostBooks, UpdateBooks } = require('../Controller/Book.Controller');

const bookRouter = express.Router();
bookRouter.get('/books',verifyToken,GetBooks)
bookRouter.post('/postbooks',verifyToken,PostBooks)
bookRouter.put('/upadtebook/:id',verifyToken,UpdateBooks)

// bookRouter.post('/signup',GetBooks)
// bookRouter.post('/signin',AuthController.Signin)
// bookRouter.post('/signout',AuthController.signOut)
// bookRouter.patch('/send-verificaton-code',AuthController.sendVerificatoncode)
// bookRouter.post('/verifiy-verificaton-code',AuthController.verifyVerificatoncode)


module.exports = bookRouter