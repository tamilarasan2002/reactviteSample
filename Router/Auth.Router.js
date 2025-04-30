

const express = require('express');
const  AuthController  = require('../Controller/Auth.Controller');
const { verifyToken } = require('../config/verifyToken');

const router = express.Router();
router.get('/verify',verifyToken,AuthController.verify)
router.post('/signup',AuthController.Signup)
router.post('/signin',AuthController.Signin)
router.post('/signout',AuthController.signOut)
router.patch('/send-verificaton-code',AuthController.sendVerificatoncode)
router.post('/verifiy-verificaton-code',AuthController.verifyVerificatoncode)


module.exports = router