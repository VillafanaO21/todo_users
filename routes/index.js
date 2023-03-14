var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');

function addUserToView(req, res, next){
    if (req.user){
        res.locals.user = req.user;
    }
    next();
}

function redirectGuests(req, res, next){
    if (!req.user){
        res.redirect('/login');
    } else {
        next();
    }
}

/* GET home page. */
router.get('/', addUserToView, redirectGuests,  todoController.listAll);

router.get('/item/add', addUserToView, redirectGuests,  todoController.displayAddItem);
router.post('/item/add', addUserToView, redirectGuests,  todoController.addNewItem);

router.get('/item/edit/:id', addUserToView, redirectGuests,  todoController.viewEditItem);
router.post('/item/edit/:id', addUserToView, redirectGuests,  todoController.saveEditItem);

router.get('/item/delete/:id', addUserToView, redirectGuests,  todoController.deleteItem);
router.get('/item/complete/:id', addUserToView, redirectGuests,  todoController.makeItemComplete);
router.get('/item/incomplete/:id', addUserToView, redirectGuests,  todoController.markItemIncomplete);

router.get('/register', addUserToView, userController.renderRegistration);
router.post('/register', addUserToView, userController.register);

router.get('/login', addUserToView, userController.renderLogin);
router.post('/login', addUserToView, userController.authenticate);

router.get('/logout', addUserToView, redirectGuests, userController.logout);

module.exports = router;
