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

	const models = await db.Emergency.findAll({
		paranoid: false,
		order: [
			['lastName', 'ASC']
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
	if (await db.Emergency.findOne({ where: {
		    [Op.or]: [{mobile: params.mobile}]
		} }))
	{
		throw 'Emergency contact already exists. Please provide a unique contact number.';
	}

	//console.log('Emergency contact:', params);

    const model = new db.Emergency(params);
	//model.lastEditedBy = 1;
    // save model
    await model.save();

	//console.log('Emergency contact:', model);

    return basicDetails(await getModelById(model.id));
}

async function update(id, params, editId) {
    const model = await getModelById(id);

	// validate (if name/shortname is unique in db)
	if ( params.mobile && (model.mobile !== params.mobile) && await db.Emergency.findOne({ where: { mobile: params.mobile } })) {
		throw 'Emergency contact already exists.';
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
    const model = await db.Emergency.findByPk(id, {
		paranoid: false,
		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.Emergency
		},
		/**/
	});
    if (!model) throw 'Emergency contact not found';
    return model;
}

async function getHistory() {

	return [];
}

async function getHistoryById(id) {

	return {};
}

function basicDetails(model) {
    const { id, firstName, lastName, mobile, status, created, updated, deletedAt, history, version, lastEditedBy } = model;
    return { id, firstName, lastName, mobile, status, created, updated, deletedAt, history, version, lastEditedBy };
}
