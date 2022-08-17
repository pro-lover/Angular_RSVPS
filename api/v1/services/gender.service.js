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

    const models = await db.Gender.findAll({
		paranoid: false,
		order: [
			['name', 'ASC']
		]
	});

	models.forEach( function(prime) {
		prime.history = [];
	});

	//console.log('db.GenderHistory:', modelsHistories.length);
    return models.map(x => basicDetails(x));
}

async function getById(id) {
    const model = await getGender(id);

	model.history = [];

    return basicDetails(model);
}

async function create(params, editId) {

	// validate
	if (await db.Gender.findOne({ where: {
			[Op.or]: [{name: params.name}, {shortName: params.shortName}]
		} }))
	{
		throw 'Gender already exists. Please provide a unique Name and Short Name.';
	}

    const model = new db.Gender(params);

    // save model
	model.lastEditedBy = editId;
    await model.save();

    return basicDetails(model);
}

async function update(id, params, editId) {
    const model = await getGender(id);

    // validate (if name was changed)
    if (params.name && model.name !== params.name && await db.Gender.findOne({ where: { name: params.name } })) {
        throw 'Gender "' + params.name + '" already exists.';
    }

    // copy params to model and save
    Object.assign(model, params);
	model.updatedAt = Date.now();
	model.lastEditedBy = editId;

    await model.save();

    return basicDetails(model);
}

async function updateStatus(id, params, editId) {
	const model = await getGender(id);

	model.status = params.status;
	model.updatedAt = Date.now();
	model.lastEditedBy = editId;

	await model.save();

	return basicDetails(model);
}

async function _delete(id, editId) {
    const model = await getGender(id);
	await model.update({updatedAt: Date.now(), lastEditedBy: editId, status: false });
    await model.destroy();

	return basicDetails(model);
}

async function restore(id, editId) {
	const model = await getGender(id);
	await model.restore();
	await model.update({lastEditedBy: editId, status: true });

	return basicDetails(model);
}

// helper functions

async function getGender(id) {
	//const transaction = await db.sequelizeInstance.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED});
    const model = await db.Gender.findByPk(id, {

		//lock: true,
		//transaction,
		/** /
		lock: {
			level: transaction.LOCK,
			of: db.Gender
		},
		/**/
	});
    if (!model) throw 'Gender not found';
    return model;
}

async function getHistory() {

	const modelHistories = await db.sequelizeInstance.query(
		"SELECT * FROM `genderHistories`",
		{
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistories;
}

async function getHistoryById(id) {

	const modelHistory = await db.sequelizeInstance.query(
		"SELECT * FROM `genderHistories` WHERE id = ?",
		{
			replacements: [id],
			type: db.sequelizeInstance.QueryTypes.SELECT
		}
	);

	return modelHistory;
}

function basicDetails(model) {
    const { id, name, shortName, status, lastEditedBy, created, updated, deletedAt, history, version } = model;
    return { id, name, shortName, status, lastEditedBy, created, updated, deletedAt, history, version };
}
