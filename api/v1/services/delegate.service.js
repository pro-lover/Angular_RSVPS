const fs = require('fs');
const path = require('path');
const fsPromises 	= require('fs').promises;
const db = require(path.join(__dirname, '../shared/db'));
const { Sequelize, Op } = require('sequelize');
const sendEmail = require(path.join(__dirname, '../shared/send-email'));

module.exports = {
	rsvp,
	getAll,
	getById,
	create,
	update,
	updateStatus,
	restore,
	delete: _delete,
	sendReminder,
	sendInvitation,
	sendTravelDetailsReminder,
	sendConfirmationNoFlightDetails,
	sendConfirmationAllDetails
};

async function getAll(reqRole) {

    const models = await db.Delegate.findAll({
		paranoid: false,
		order: [
			['firstName', 'ASC']
		],
		include:[
			{
				model: db.Country,
				//as:'country',
				required:false
			},
			{
				model: db.Office,
				as:'office',
				required:false
			},
			{
				model: db.ShirtSize,
				as:'shirtsize',
				required:false
			},
			{
				model: db.Emergency,
				as:'emergencies',
				required:false
			},
			{
				model: db.Travel,
				as:'travels',
				required:false
			},
			{
				model: db.Diet,
				as:'diet',
				required:false
			},
		]
	});

	models.forEach( function(prime) {
		prime.history = [];
	});

	//return models;

    return models.map(x => basicDetails(x));
}

async function getById(id) {
    const model = await getModelById(id);
	const modelHistory = await getHistoryById(id);

	if( modelHistory.length > 0 ) {
		model.history = modelHistory.filter( function (sub) {
			return sub.id === model.id;
		});
	} else {
		model.history = [];
	}

    return basicDetails(model);
}

async function create(params, editId) {
	// validate
	if (await db.Delegate.findOne({ where: {
            [Op.or]: [{email: params.email}]
		} }))
	{
		throw 'Delegate already exists. Please provide a unique email address.';
	}

    const model = new db.Delegate(params);
	model.lastEditedBy = editId;
    // save model
    await model.save();

	sendConfirmationNoFlightDetails({
		delegateId: model.id,
	});

    return basicDetails(await getModelById(model.id));
}

async function update(id, params, editId) {
    const model = await getModelById(id);

	// validate (if name/shortname is unique in db)
	if ( params.email && (model.email !== params.email) && await db.Delegate.findOne({ where: { email: params.email } })) {
		throw 'email already exists.';
	}

    // copy params to model and save
    Object.assign(model, params);
    model.updated = Date.now();
	model.lastEditedBy = editId;
    await model.save();

    return basicDetails(model);
}

async function updateStatus(id, params, editId) {
	const model = await getModelById(id);

	model.status = params.status;
	model.updated = Date.now();
	model.lastEditedBy = editId;

	await model.save();

	return basicDetails(model);
}

async function rsvp(id, params, editId) {
	const model = await getModelById(id);

	model.rsvp = params.status;
	model.updated = Date.now();
	model.lastEditedBy = editId;

	await model.save();

	return basicDetails(model);
}

async function _delete(id, editId) {
    const model = await getModelById(id);
	await model.update({updated: Date.now(), lastEditedBy: editId, status: false });
    await model.destroy();
	return basicDetails(model);
}

async function restore(id, editId) {
	const model = await getModelById(id);
	await model.restore();
	await model.update({lastEditedBy: editId, status: true });
	return basicDetails(model);
}


// EMAILS
async function sendInvitation(params) {

	const model = await getModelById(params.delegateId);

	const bufferHTMLData = await asyncReadfile(path.join(__dirname, '../../assets/boilerplates/mailer-invitation.html'), 'utf8')
	.then( async (dataHTML) => {

		let messageHTML = Buffer.from(dataHTML);
		return messageHTML.toString();

		//return Buffer.from(dataHTML);
	});

	//let messageHTML = bufferHTMLData.toString();

	const CONST_NAME = new RegExp('{{PLEASEREPLACE_NAME}}', 'g');
	const CONST_SURNAME = new RegExp('{{PLEASEREPLACE_SURNAME}}', 'g');

	/**/
	let result = bufferHTMLData
		.replace(CONST_NAME, model.firstName)
		.replace(CONST_SURNAME, model.lastName);
	/**/

	//console.log('Read file:', model.firstName, result );

	/**/
	return await sendEmail({
		to: model.email,
		subject: 'TBWA Africa Conference 2022 - Invitation',
		html: `${result}`
	});
	/**/
}

async function sendReminder(params) {

	const model = await getModelById(params.delegateId);

	const bufferHTMLData = await asyncReadfile(path.join(__dirname, '../../assets/boilerplates/mailer-reminder-general.html'), 'utf8')
	.then( async (dataHTML) => {

		let messageHTML = Buffer.from(dataHTML);
		return messageHTML.toString();

		//return Buffer.from(dataHTML);
	});

	//let messageHTML = bufferHTMLData.toString();

	const CONST_NAME = new RegExp('{{PLEASEREPLACE_NAME}}', 'g');
	const CONST_SURNAME = new RegExp('{{PLEASEREPLACE_SURNAME}}', 'g');

	/**/
	let result = bufferHTMLData
		.replace(CONST_NAME, model.firstName)
		.replace(CONST_SURNAME, model.lastName);
	/**/

	//console.log('Read file:', model.firstName, result );

	/**/
	return await sendEmail({
		to: model.email,
		subject: 'TBWA Africa Conference- Registration Reminder',
		html: `${result}`
	});
	/**/
}

async function sendTravelDetailsReminder(params) {

	const model = await getModelById(params.delegateId);

	const bufferHTMLData = await asyncReadfile(path.join(__dirname, '../../assets/boilerplates/mailer-reminder-flight-details.html'), 'utf8')
	.then( async (dataHTML) => {

		let messageHTML = Buffer.from(dataHTML);
		return messageHTML.toString();

		//return Buffer.from(dataHTML);
	});

	//let messageHTML = bufferHTMLData.toString();

	const CONST_NAME = new RegExp('{{PLEASEREPLACE_NAME}}', 'g');
	const CONST_SURNAME = new RegExp('{{PLEASEREPLACE_SURNAME}}', 'g');
	const CONST_UUID = new RegExp('{{PLEASEREPLACE_UUID}}', 'g');

	/**/
	let result = bufferHTMLData
		.replace(CONST_NAME, model.firstName)
		.replace(CONST_SURNAME, model.lastName)
		.replace(CONST_UUID, model.id);
	/**/

	//console.log('Read file:', model.firstName, result );

	/**/
	return await sendEmail({
		to: model.email,
		subject: 'TBWA Africa Conference- Travel Details Reminder.',
		html: `${result}`
	});
	/**/
}

async function sendConfirmationNoFlightDetails(params) {

	const model = await getModelById(params.delegateId);

	const bufferHTMLData = await asyncReadfile(path.join(__dirname, '../../assets/boilerplates/mailer-registration-complete-no-flight-details.html'), 'utf8')
	.then( async (dataHTML) => {

		let messageHTML = Buffer.from(dataHTML);
		return messageHTML.toString();

		//return Buffer.from(dataHTML);
	});

	//let messageHTML = bufferHTMLData.toString();

	const CONST_NAME = new RegExp('{{PLEASEREPLACE_NAME}}', 'g');
	const CONST_SURNAME = new RegExp('{{PLEASEREPLACE_SURNAME}}', 'g');
	const PLEASEREPLACE_TITLE = new RegExp('{{PLEASEREPLACE_TITLE}}', 'g');
	const PLEASEREPLACE_MOBILENO = new RegExp('{{PLEASEREPLACE_MOBILENO}}', 'g');
	const PLEASEREPLACE_COUNTRY = new RegExp('{{PLEASEREPLACE_COUNTRY}}', 'g');
	const PLEASEREPLACE_OFFICE = new RegExp('{{PLEASEREPLACE_OFFICE}}', 'g');
	const PLEASEREPLACE_NEXT_Of_KIN = new RegExp('{{PLEASEREPLACE_NEXT_Of_KIN}}', 'g');
	const PLEASEREPLACE_ALLERGIES = new RegExp('{{PLEASEREPLACE_ALLERGIES}}', 'g');
	const PLEASEREPLACE_MEDICAL_CONDITIONS = new RegExp('{{PLEASEREPLACE_MEDICAL_CONDITIONS}}', 'g');
	const PLEASEREPLACE_DIET_REQUIREMENTS = new RegExp('{{PLEASEREPLACE_DIET_REQUIREMENTS}}', 'g');
	const PLEASEREPLACE_SHIRT_SIZE = new RegExp('{{PLEASEREPLACE_SHIRT_SIZE}}', 'g');
	const PLEASEREPLACE_SHOE_SIZE = new RegExp('{{PLEASEREPLACE_SHOE_SIZE}}', 'g');

	/**/
	let result = bufferHTMLData
		.replace(CONST_NAME, model.firstName)
		.replace(CONST_SURNAME, model.lastName)
		.replace(PLEASEREPLACE_TITLE, model.designation)
		.replace(PLEASEREPLACE_MOBILENO, model.mobileno)
		.replace(PLEASEREPLACE_COUNTRY, model.countryId)
		.replace(PLEASEREPLACE_OFFICE, model.office.name)
		.replace(PLEASEREPLACE_NEXT_Of_KIN, model.emergencies[0].firstName + ' ' + model.emergencies[0].lastName + ' - ' + model.emergencies[0].mobile)
		.replace(PLEASEREPLACE_ALLERGIES, model.allergies)
		.replace(PLEASEREPLACE_MEDICAL_CONDITIONS, model.medicalcondition)
		.replace(PLEASEREPLACE_DIET_REQUIREMENTS, model.diet.name + ' ' + model.additionalDiet)
		.replace(PLEASEREPLACE_SHIRT_SIZE, model.shirtsize.name)
		.replace(PLEASEREPLACE_SHOE_SIZE, model.shoesize);
	/**/

	//console.log('Read file:', model.firstName, result );

	/**/
	return await sendEmail({
		to: model.email,
		subject: 'TBWA Africa Conference- Registration Confirmation',
		html: `${result}`
	});
	/**/
}

async function sendConfirmationAllDetails(params) {

	const model = await getModelById(params.delegateId);

	const bufferHTMLData = await asyncReadfile(path.join(__dirname, '../../assets/boilerplates/mailer-registration-complete-all-details.html'), 'utf8')
	.then( async (dataHTML) => {

		let messageHTML = Buffer.from(dataHTML);
		return messageHTML.toString();

		//return Buffer.from(dataHTML);
	});

	//let messageHTML = bufferHTMLData.toString();

	const CONST_NAME = new RegExp('{{PLEASEREPLACE_NAME}}', 'g');
	const CONST_SURNAME = new RegExp('{{PLEASEREPLACE_SURNAME}}', 'g');
	const PLEASEREPLACE_TITLE = new RegExp('{{PLEASEREPLACE_TITLE}}', 'g');
	const PLEASEREPLACE_MOBILENO = new RegExp('{{PLEASEREPLACE_MOBILENO}}', 'g');
	const PLEASEREPLACE_COUNTRY = new RegExp('{{PLEASEREPLACE_COUNTRY}}', 'g');
	const PLEASEREPLACE_OFFICE = new RegExp('{{PLEASEREPLACE_OFFICE}}', 'g');
	const PLEASEREPLACE_NEXT_Of_KIN = new RegExp('{{PLEASEREPLACE_NEXT_Of_KIN}}', 'g');
	const PLEASEREPLACE_ALLERGIES = new RegExp('{{PLEASEREPLACE_ALLERGIES}}', 'g');
	const PLEASEREPLACE_MEDICAL_CONDITIONS = new RegExp('{{PLEASEREPLACE_MEDICAL_CONDITIONS}}', 'g');
	const PLEASEREPLACE_DIET_REQUIREMENTS = new RegExp('{{PLEASEREPLACE_DIET_REQUIREMENTS}}', 'g');
	const PLEASEREPLACE_SHIRT_SIZE = new RegExp('{{PLEASEREPLACE_SHIRT_SIZE}}', 'g');
	const PLEASEREPLACE_SHOE_SIZE = new RegExp('{{PLEASEREPLACE_SHOE_SIZE}}', 'g');

	const PLEASEREPLACE_ARRIVAL_DATE = new RegExp('{{PLEASEREPLACE_ARRIVAL_DATE}}', 'g');
	const PLEASEREPLACE_ARRIVAL_FLIGHT_NUMBER = new RegExp('{{PLEASEREPLACE_ARRIVAL_FLIGHT_NUMBER}}', 'g');
	const PLEASEREPLACE_DEPARTURE_DATE = new RegExp('{{PLEASEREPLACE_DEPARTURE_DATE}}', 'g');
	const PLEASEREPLACE_DEPARTURE_FLIGHT_NUMBER = new RegExp('{{PLEASEREPLACE_DEPARTURE_FLIGHT_NUMBER}}', 'g');

	/**/
	let result = bufferHTMLData
		.replace(CONST_NAME, model.firstName)
		.replace(CONST_SURNAME, model.lastName)
		.replace(PLEASEREPLACE_TITLE, model.designation)
		.replace(PLEASEREPLACE_MOBILENO, model.mobileno)
		.replace(PLEASEREPLACE_COUNTRY, model.countryId)
		.replace(PLEASEREPLACE_OFFICE, model.office.name)
		.replace(PLEASEREPLACE_NEXT_Of_KIN, model.emergencies[0].firstName + ' ' + model.emergencies[0].lastName + ' - ' + model.emergencies[0].mobile)
		.replace(PLEASEREPLACE_ALLERGIES, model.allergies)
		.replace(PLEASEREPLACE_MEDICAL_CONDITIONS, model.medicalcondition)
		.replace(PLEASEREPLACE_DIET_REQUIREMENTS, model.diet.name + ' ' + model.additionalDiet)
		.replace(PLEASEREPLACE_SHIRT_SIZE, model.shirtsize.name)
		.replace(PLEASEREPLACE_SHOE_SIZE, model.shoesize)
		.replace(PLEASEREPLACE_ARRIVAL_DATE, model.travels[0].arrivalDate)
		.replace(PLEASEREPLACE_ARRIVAL_FLIGHT_NUMBER, model.travels[0].arrivalNumber)
		.replace(PLEASEREPLACE_DEPARTURE_DATE, model.travels[0].departureDate)
		.replace(PLEASEREPLACE_DEPARTURE_FLIGHT_NUMBER, model.travels[0].departureNumber);

	//console.log('Read file:', model.firstName, result );

	/**/
	return await sendEmail({
		to: model.email,
		subject: 'TBWA Africa Conference- Registration Confirmation',
		html: `${result}`
	});
	/**/
}

// helper functions

async function getModelById(id) {
	//const transaction = await db.sequelizeInstance.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    const model = await db.Delegate.findByPk(id, {
		paranoid: false,
		include:[
			{
				model: db.Country,
				//as:'country',
				required:false
			},
			{
				model: db.Office,
				as:'office',
				required:false
			},
			{
				model: db.ShirtSize,
				as:'shirtsize',
				required:false
			},
			{
				model: db.Emergency,
				as:'emergencies',
				required:false
			},
			{
				model: db.Travel,
				as:'travels',
				required:false
			},
			{
				model: db.Diet,
				as:'diet',
				required:false
			},
		]
		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.Delegate
		},
		/**/
	});
    if (!model) throw 'Delegate not found';
    return model;
}

async function getHistory() {

	return [];
}

async function getHistoryById(id) {

	return {};
}

function basicDetails(model) {
    const { id, email, designation, firstName, lastName, passportNumber, mobileno, medicalcondition, allergies, additionalDiet, otherOffice, shoesize, officeId, office, dietId, diet, countryId, country, shirtsizeId, shirtsize, emergencies, travels, visaRequired, rsvp, status, created, updated, deletedAt, history, version, lastEditedBy } = model;
    return { id, email, designation, firstName, lastName, passportNumber, mobileno, medicalcondition, allergies, additionalDiet, otherOffice, shoesize, officeId, office, dietId, diet, countryId, country, shirtsizeId, shirtsize, emergencies, travels, visaRequired, rsvp, status, created, updated, deletedAt, history, version, lastEditedBy };
}

async function asyncReadfile( fileName ) {

	return await fsPromises
		.readFile( fileName )
		.catch(
			(err) => console.error('Failed to read file:', err)
		);

	//console.log('Read file:', fileName)
	//return JSON.parse(data.toString());
}
