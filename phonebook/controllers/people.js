const personRouter = require("express").Router();
const Person = require("../models/person");

personRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

personRouter.get("/:id", (request, response) => {
    Person.findById(request.params.id).then((person) => {
      response.json(person);
    });
  });

personRouter.post("/", (request, response,next) => {
  const body = request.body;
  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
  .then((savedPerson) => {
    response.json(savedPerson);
  })
  .catch(error => next(error));
});

personRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

personRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const updatedPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, updatedPerson,{new:true,runValidators:true,context:'query'})
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = personRouter
