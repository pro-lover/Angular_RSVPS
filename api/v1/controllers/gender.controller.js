const express = require('express');
const router = express.Router();
const Joi = require('joi');
const path = require('path');

const validateRequest = require(path.join(__dirname, '../middleware/validate-request'));
const authorize = require(path.join(__dirname, '../middleware/authorize'))
const Role = require(path.join(__dirname, '../shared/role'));
const genderService = require(path.join(__dirname, '../services/gender.service'));

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);

router.post('/', authorize([Role.Admin]), createSchema, create);
router.put('/:id/restore', authorize([Role.Admin]), restore);
router.put('/:id/update-status', authorize([Role.Admin]), updateStatusSchema, updateStatus);
router.put('/:id', authorize([Role.Admin]), updateSchema, update);
router.delete('/:id', authorize([Role.Admin]), _delete);

module.exports = router;

function getAll(req, res, next) {
	genderService.getAll()
		.then(models => res.json(models))
		.catch(next);
}

function getById(req, res, next) {

	if ( Number(req.params.id) ) {
		genderService.getById(req.params.id)
			.then(model => model ? res.json(model) : res.sendStatus(404))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		shortName: Joi.string().required()
	});
	validateRequest(req, next, schema);
}

function create(req, res, next) {
	genderService.create(req.body, req.user.id)
		.then(model => res.json(model))
		.catch(next);
}

function updateSchema(req, res, next) {

	const schemaRules = Joi.object({
		name: Joi.string().empty(''),
		shortName: Joi.string().empty('')
	});
	validateRequest(req, next, schemaRules);
}

function update(req, res, next) {

	if ( Number(req.params.id) ) {
		genderService.update(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function updateStatusSchema(req, res, next) {
	const schemaRules = Joi.object({
		status: Joi.boolean().required()
	});
	validateRequest(req, next, schemaRules);
}

function updateStatus(req, res, next) {

	if ( Number(req.params.id) ) {
		genderService.updateStatus(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function _delete(req, res, next) {

	if ( Number(req.params.id) ) {
		genderService.delete(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}


function restore(req, res, next) {

	if ( Number(req.params.id) ) {
		genderService.restore(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

// helper functions
