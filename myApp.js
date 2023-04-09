require('dotenv').config();
const mongoose = require('mongoose');
const conStr = process.env['MONGO_URI'];
// console.log(process.env.MONGO_URI);
// console.log(conStr);
mongoose.connect(conStr, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 }).catch(err => console.log(err.reason));

//#region Checking connection is successful or neither
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(conStr, { useNewUrlParser: true, useUnifiedTopology: true, /* serverSelectionTimeoutMS: 5000 */ });
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    console.log(err.reason)
    return;
  }

  console.log('Connected to MongoDB successfully🤗');

  const db = client.db('fcc-mongodb-and-mongoose'); // replace with your database name
  const collection = db.collection('people'); // replace with your collection name

  collection.find({}).toArray((err, docs) => {
    if (err) {
      console.error('Error querying MongoDB:', err);
      return;
    }

    console.log('Query results:', docs);

    client.close();
  });
});
//#endregion
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: Array
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "John Does", 
    age: 87, 
    favoriteFoods: ["apple", "pen"]
  });

  person.save((err, data) => {
    if (err) {
      console.log(err);/* 
      done(err); */
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};
//#region createManyPeople test
// const arrayOfPeople = [
//   {name: 'Mary', age: 23, favoriteFoods: ['pizza', 'salad']},
//   {name: 'Jane', age: 33, favoriteFoods: ['onions', 'chicken']},
//   {name: 'Bob', age: 43, favoriteFoods: ["apple", "pen"]},
//   {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
//   {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
//   {name: "Robert", age: 78, favoriteFoods: ["wine"]}
// ];
// createManyPeople(arrayOfPeople/* , function(err, people) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(people);
//   }
// } */);
//#endregion
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    })
  })
};

// findEditThenSave('64327ae08565cb55c3db6127', (err, person) => {
//   if (err) return console.log(err);
// });

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    data[0].age = ageToSet;
    data[0].save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    })
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return done(err);
    const successMessage = `Successfully removed ${data.deletedCount} people with the name ${nameToRemove}`;
    console.log(successMessage);
    return done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

//#region **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */
//#endregion **Well Done !!**

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