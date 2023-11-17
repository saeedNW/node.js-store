/** import express module */
const express = require('express');
/** create express Router instance */
const namespaceRouter = express.Router();
/** import controller */
const {NamespaceController} = require('app/http/controllers/support/namespace.controller');

/** new name space process route */
namespaceRouter.post('/add', NamespaceController.addNamespace);

/** namespaces retrieve process route */
namespaceRouter.get('/list', NamespaceController.retrieveNamespaces);

module.exports = {namespaceRouter};