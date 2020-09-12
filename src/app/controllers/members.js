const { age, date } = require("../../lib/utils");
const member = require("../models/member");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query
    
    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(members) {
        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page
        }
        return res.render("members/index", { members, pagination, filter })
      }
    }
    member.paginate(params)
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
      return res.redirect("/members")
    })
  },
};
