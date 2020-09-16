require('dotenv').config();
let mongoose = require('mongoose');
let faker = require('faker');
let _ = require('lodash');

let User = require('../models/user');
let Project = require('../models/project');
let Exception = require('../models/exception');

const truncate = () => {
	mongoose.connection.db.collection('users', (err, collection) => {
		collection.deleteMany({});
	});
	mongoose.connection.db.collection('projects', (err, collection) => {
		collection.deleteMany({});
	});
	mongoose.connection.db.collection('exceptions', (err, collection) => {
		collection.deleteMany({});
	});
};

const randomClass = () => {
	return _.trim(faker.lorem.words(), '.').split(' ').map(_.upperFirst).join('\\')
};

const randomFile = () => {
	return faker.lorem.sentence().split(' ').join('/') + faker.random.arrayElement(['php', 'js']);
};

const seed = async () => {
	await truncate();

	for (let i = 0; i < 3; i++) {
		const user = await User.create({
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			email: faker.internet.email(),
		});

		for (let i = 0; i < 2; i++) {
			const project = await Project.create({
				user: user._id,
				name: faker.lorem.word(),
				language: faker.random.arrayElement(['php', 'js', 'java']),
				type: faker.random.arrayElement(['lumen', 'nodejs', 'laravel']),
				api_key: faker.random.uuid(),
			});

			for (let i = 0; i < 25; i++) {

				let files = [];

				for (let f = 0; f < 2; f++) {
					 files.push({
						 class: randomClass(),
						 file: randomFile(),
						 line: faker.random.number(),
						 code: {
							 "25": "",
							 "26": "        $whoisData->network_name_2 = $this->message['network_name'];",
							 "27": "        $whoisData->payload = $this->message['contact_information'];",
							 "28": "        $whoisData->asns = $this->message['asn'];",
							 "29": "        $whoisData->save(2);",
							 "30": "    }",
							 "31": "}"
						 }
					 })
				}

				const exception = await Exception.create({
					project: project._id,
					stage: faker.random.arrayElement(['development', 'production']),
					severity: faker.random.arrayElement(['error', 'warning', 'info']),
					status: faker.random.arrayElement(['open', 'closed', 'ignored', 'hidden']),
					handled: faker.random.boolean(),
					error_class: randomClass(),
					message: faker.lorem.sentence(),
					context: `${randomFile()}:${faker.random.number()}`,
					files: files
				});
			}
		}
	}
	console.log('seeded');
	process.exit();
};

mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
}).then(seed).catch((err) => {
	if (err) console.log(err);
	process.exit()
});
