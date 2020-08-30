const { age, date } = require("../../lib/utils");
const instructor = require("../models/instructor");

module.exports = {
  index(req, res) {
    const { filter } = req.query;
      instructor.findBy(filter, function(instructors){
        return res.render("instructors/index", { instructors });
      })
    if (filter) {
    } else {
      instructor.all(function (instructors) {
        return res.render("instructors/index", { instructors });
      });
    }
  },
  create(req, res) {
    return res.render("instructors/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    instructor.create(req.body, function () {
      return res.redirect("/instructors");
    });
  },
  show(req, res) {
    instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructors not found!");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.created_at = date(instructor.created_at).format;

      return res.render("instructors/show", { instructor });
    });
  },
  edit(req, res) {
    instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructors not found!");

      instructor.birth = date(instructor.birth).iso;
      instructor.services = instructor.services.split(",");
      instructor.created_at = date(instructor.created_at).format;

      return res.render("instructors/edit", { instructor });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    instructor.update(req.body, function () {
      return res.redirect(`/instructors/${req.body.id}`);
    });
  },
  delete(req, res) {
    instructor.delete(req.body.id, function () {
      return res.redirect(`/instructors`);
    });
  },
};
