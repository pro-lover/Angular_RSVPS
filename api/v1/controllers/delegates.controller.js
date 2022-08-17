const express = require('express');
const router = express.Router();
const Joi = require('joi');
const path = require('path');
const rateLimit = require("express-rate-limit");
const preciseMemory = require("precise-memory-rate-limit/lib");
const logger = require('node-color-log');

const validateRequest = require(path.join(__dirname, '../middleware/validate-request'));
const authorize = require(path.join(__dirname, '../middleware/authorize'));
const Role = require(path.join(__dirname, '../shared/role'));
const delegateService = require(path.join(__dirname, '../services/delegate.service'));

const limiter = rateLimit({
	store: new preciseMemory(15 * 60 * 1000, 15),
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 15 // limit each IP to 5 requests per windowMs
});

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);
router.post('/send-invitation', authorize([Role.Admin]), sendReminderSchema, sendInvitation);
router.post('/send-reminder', authorize([Role.Admin]), sendReminderSchema, sendReminder);
router.post('/send-reminder-travel-details', authorize([Role.Admin]), sendReminderSchema, sendTravelDetailsReminder);
router.post('/send-confirmation-travel-details', authorize([Role.Admin]), sendReminderSchema, sendConfirmationAllDetails);
router.post('/send-confirmation', authorize([Role.Admin]), sendReminderSchema, sendConfirmationNoFlightDetails);
router.post('/', createSchema, create);

router.put('/:id/restore', authorize([Role.Admin]), restore);
router.put('/:id/update-status', authorize(Role.Admin), updateStatusSchema, updateStatus);
router.put('/:id', authorize(), updateSchema, update);

router.delete('/:id', authorize(), _delete);

module.exports = router;


function getAll(req, res, next) {
    delegateService.getAll()
        .then(models => res.json(models))
        .catch(next);
}

function getById(req, res, next) {
    //
	if ( Number(req.params.id) ) {
		delegateService.getById(req.params.id)
			.then(model => model ? res.json(model) : res.sendStatus(404))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		mobileno: Joi.string().min(10).required(),
		designation: Joi.string().required(),
		medicalcondition: Joi.string().required(),
		allergies: Joi.string().required(),
		additionalDiet: Joi.string().required(),
		otherOffice: Joi.string().required(),
		countryId: Joi.number().required(),
		shirtsizeId: Joi.number().required(),
		officeId: Joi.number().required(),
		dietId: Joi.number().required(),
		shoesize: Joi.string().required(),
	});
	validateRequest(req, next, schema);
}

function create(req, res, next) {
    delegateService.create(req.body)
        .then(account => res.json(account))
        .catch(next);
}

function updateSchema(req, res, next) {

	const schema = Joi.object({
		id: Joi.number().required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		mobileno: Joi.string().min(10).required(),
		designation: Joi.string().required(),
		medicalcondition: Joi.string().required(),
		allergies: Joi.string().required(),
		additionalDiet: Joi.string().required(),
		otherOffice: Joi.string().required(),
		countryId: Joi.number().required(),
		shirtsizeId: Joi.number().required(),
		officeId: Joi.number().required(),
		dietId: Joi.number().required(),
		shoesize: Joi.string().required(),
	});

    validateRequest(req, next, schema);
}

function update(req, res, next) {

	if ( Number(req.params.id) ) {
		delegateService.update(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);

    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	/** /
	// admins can update any account
	if ( Number(req.params.id) && (req.user.role == Role.Admin) ) {
		delegateService.update(req.params.id, req.body, req.user.id)
			.then(account => res.json(account))
			.catch(next);

	// users can only update their own account
	} else if ( Number(req.params.id) === Number(req.user.id) ) {

		delegateService.update(req.params.id, req.body, req.user.id)
			.then(account => res.json(account))
			.catch(next);

	} else {
		//console.log('Failed!', req.params.id, req.user.id);

		return res.status(401).json({ message: 'Unauthorized' });
	}
	/**/
}

function updateStatusSchema(req, res, next) {
	const schemaRules = Joi.object({
		status: Joi.boolean().required()
	});
	validateRequest(req, next, schemaRules);
}

function updateStatus(req, res, next) {

	if ( Number(req.params.id) ) {
		delegateService.updateStatus(req.params.id, req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function _delete(req, res, next) {

	if ( Number(req.params.id) ) {
        delegateService.delete(req.params.id, req.user.id)
			.then(() => res.json({ message: 'Delegate deleted successfully' }))
			.catch(next);
    } else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function restore(req, res, next) {

	if ( Number(req.params.id) ) {
		delegateService.restore(req.params.id, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

//
function sendReminderSchema(req, res, next) {
	const schemaRules = Joi.object({
		type: Joi.string().required(),
		delegateId: Joi.number().required()
	});
	validateRequest(req, next, schemaRules);
}

function sendReminder(req, res, next) {

	if ( Number(req.body.delegateId) ) {
		delegateService.sendReminder(req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function sendInvitation(req, res, next) {

	if ( Number(req.body.delegateId) ) {
		delegateService.sendInvitation(req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function sendTravelDetailsReminder(req, res, next) {

	if ( Number(req.body.delegateId) ) {
		delegateService.sendTravelDetailsReminder(req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function sendConfirmationAllDetails(req, res, next) {

	if ( Number(req.body.delegateId) ) {
		delegateService.sendConfirmationAllDetails(req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

function sendConfirmationNoFlightDetails(req, res, next) {

	if ( Number(req.body.delegateId) ) {
		delegateService.sendConfirmationNoFlightDetails(req.body, req.user.id)
			.then(model => res.json(model))
			.catch(next);
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

// helper functions
