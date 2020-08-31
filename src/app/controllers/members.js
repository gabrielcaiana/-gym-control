const { age, date } = require("../../lib/utils");
const member = require("../models/member");

module.exports = {
  index(req, res) {
    member.all(function (members) {
      return res.render("members/index", { members });
    });
  },
  create(req, res) {
    member.instructorsSelectOptions(function(options){
      return res.render("members/create", {instructorOptions: options});
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    member.create(req.body, function () {
      return res.redirect("/members");
    });
  },
  show(req, res) {
    member.find(req.params.id, function (member) {
      if (!member) return res.send("Members not found!");

      member.birth = date(member.birth).birthDay;

      return res.render("members/show", { member });
    });
  },
  edit(req, res) {
    member.find(req.params.id, function (Member) {
      if (!Member) return res.send("Members not found!");

      Member.birth = date(Member.birth).iso
      
      member.instructorsSelectOptions(function(options){
        return res.render("members/edit", {Member, instructorOptions: options});
      })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    member.update(req.body, function(){
      return res.redirect(`/members/${req.body.id}`)
    })
  },
  delete(req, res) {
    member.delete(req.body.id, function(){
      return res.redirect(`/members`)
    })
  },
};
