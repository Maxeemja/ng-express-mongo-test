const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: {
		type: Number,
		min: 1,
		max: 99,
		validate: {
			validator: (v) => v % 2 === 0,
			message: (props) => `${props.value} is not and even number`
		}
	},
	email: { type: String, lowercase: true, minLength: 7 },
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	bestFriend: {
		type: String,
		ref: 'User'
	},
	hobbies: [String],
	address: {
		street: String,
		city: String
	}
});

userSchema.methods.sayHi = function () {
	console.log(`Hi! My name's ${this.name}`);
};

userSchema.statics.findByName = function (name) {
	return this.where('name').equals(name);
};

module.exports =  mongoose.model('User', userSchema);
