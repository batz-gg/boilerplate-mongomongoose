require('dotenv').config();
const mongoose = require('mongoose');
const conStr = process.env['MONGO_URI'];
// console.log(conStr);
mongoose.connect(conStr, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 }).catch(err => console.log(err.reason));

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: Array
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "John Doe", 
    age: 87, 
    favoriteFoods: ["apple", "pen"]
  });

  person.save((err, data) => {
    if (err) {
      console.log(err);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });
};
const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
