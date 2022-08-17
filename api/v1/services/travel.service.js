const path = require('path');
const db = require(path.join(__dirname, '../shared/db'));
const { Sequelize, Op } = require('sequelize');

module.exports = {
	getAll,
	getById,
	create,
	update,
	updateStatus,
	restore,
	delete: _delete
};

async function getAll() {

	const models = await db.Travel.findAll({
		paranoid: false,
		order: [
			['arrivalDate', 'ASC']
		],
	});

	models.forEach( function(prime) {
		prime.history = [];
	});

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

async function create(params) {
	// validate
	if (await db.Travel.findOne({ where: {
		[Op.or]: [{delegateId: params.delegateId}]
		} }))
	{
		throw 'Travel booking already exists. Please provide a unique Name.';
	}

    const model = new db.Travel(params);
	//model.lastEditedBy = editId;
    // save model
    await model.save();

    return basicDetails(await getModelById(model.id));
}

async function update(id, params, editId) {
    const model = await getModelById(id);

	// validate (if name/shortname is unique in db)
	//if ( params.delegateId && (model.delegateId !== params.delegateId) && await db.Travel.findOne({ where: { delegateId: params.delegateId } })) {
	//	throw 'Travel already exists.';
	//}

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

// helper functions

async function getModelById(id) {
	//const transaction = await db.sequelizeInstance.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    const model = await db.Travel.findByPk(id, {
		paranoid: false,
		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.Travel
		},
		/**/
	});
    if (!model) throw 'Travel Booking not found';
    return model;
}

async function getHistory() {

	return [];
}

async function getHistoryById(id) {

	return {};
}

function basicDetails(model) {
    const { id, arrivalDate, departureDate, arrivalNumber, departureNumber, status, created, updated, deletedAt, history, version, lastEditedBy } = model;
    return { id, arrivalDate, departureDate, arrivalNumber, departureNumber, status, created, updated, deletedAt, history, version, lastEditedBy };
}
