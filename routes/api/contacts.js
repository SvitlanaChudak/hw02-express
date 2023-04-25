const express = require('express');

const router = express.Router();

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { schema } = require('../../models/contact');

const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getContacts);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schema.addSchema), ctrl.add);

router.delete('/:id', authenticate, isValidId, ctrl.deleteByID);

router.put('/:id', authenticate, isValidId, validateBody(schema.updateSchema), ctrl.updateById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schema.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router
