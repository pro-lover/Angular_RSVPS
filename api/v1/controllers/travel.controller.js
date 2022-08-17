const express = require('express');
const router = express.Router();
const Joi = require('joi');
const path = require('path');

const validateRequest = require(path.join(__dirname, '../middleware/validate-request'));
const authorize = require(path.join(__dirname, '../middleware/authorize'));
const Role = require(path.join(__dirname, '../shared/role'));
const travelService = require(path.join(__dirname, '../services/travel.service'));

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);

router.post('/', createSchema, create);
router.put('/:id/restore', authorize([Role.Admin, Role.ProjectLeader]), restore);
router.put('/:id/update-status', authorize([Role.Admin, Role.ProjectLeader]), updateStatusSchema, updateStatus);
router.put('/:id', authorize([Role.Admin, Role.ProjectLeader]), updateSchema, update);
router.delete('/:id', authorize([Role.Admin, Role.ProjectLeader]), _delete);

module.exports = router;

function getAll(req, res, next) {
	travelService.getAll()
		.then(models => res.json(models))
		.catch(next);
}

function getById(req, res, next) {

	if ( Number(req.params.id) ) {
        travelService.getById(req.params.id)
			.then(model => model ? res.json(model) : res.sendStatus(404))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		delegateId: Joi.number().required(),
		arrivalDate: Joi.string().required(),
		departureDate: Joi.string().required(),
		arrivalNumber: Joi.string().required(),
		departureNumber: Joi.string().required()
	});
	validateRequest(req, next, schema);
}


function create(req, res, next) {
	travelService.create(req.body)
		.then(model => res.json(model))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schemaRules = Joi.object({
		delegateId: Joi.string().required(),
		arrivalDate: Joi.string().required(),
		departureDate: Joi.string().required(),
		arrivalNumber: Joi.string().required(),
		departureNumber: Joi.string().required()
	});
    validateRequest(req, next, schemaRules);
}

function update(req, res, next) {

	if ( Number(req.params.id) ) {
		travelService.update(req.params.id, req.body, req.user.id)
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
		travelService.updateStatus(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function _delete(req, res, next) {

    if ( Number(req.params.id) ) {
        travelService.delete(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function restore(req, res, next) {

	if ( Number(req.params.id) ) {
		travelService.restore(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}

}
// helper functions
