const Notes = require('../models/notes')
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

require('dotenv').config()


class TodoCtrl {
  static addNote(req,res){
    jwt.verify(req.headers.tokenjwt, process.env.JWT_SECRET , function(err, decoded) {
      let insert={
        header:req.body.header,
        userid: decoded.id,
        username:decoded.name,
        createdAt: new Date(),
      }
    Notes.create(insert).then(result=>{
      res.status(200).json({newNote:result})
    }).catch(err=>{
      res.status(400).json({err:err})
    })
    })
  }

  static getAll(req,res){
    // console.log(req.body);
    jwt.verify(req.headers.tokenjwt, process.env.JWT_SECRET , function(err, decoded) {
      Notes.find({userid:decoded.id})
      .then(result=>{
        res.status(200).json({notes:result})
      }).catch(err=>{
        res.status(400).json({err:err})
      })
    })

  }

  static deleteNote(req,res){
    // jwt.verify(req.headers.tokenjwt, process.env.JWT_SECRET , function(err, decoded) {
      Notes.findOneAndRemove({_id:req.params.noteid})
      .then(result=>{
          res.status(200).json({deleted:result})
      }).catch(err=>{
        res.status(400).json({err:err})
      })
    // })

  }

  static addTask(req,res){
    // jwt.verify(req.headers.tokenjwt, process.env.JWT_SECRET , function(err, decoded) {
      let task={
        _id: new mongoose.Types.ObjectId ,
        task: req.body.task,
        detail:req.body.detail,
        completed:false,
        inputAt:new Date()
      }

    Notes.update({_id:req.params.noteid} , {$push:{list:task}})
    .then(result=>{
      res.status(200).json({newTask:task})
    }).catch(err=>{
      res.status(400).json({err:err})
    })
  // })
  }

  static deleteTask(req,res){
    // jwt.verify(req.headers.tokenjwt, process.env.JWT_SECRET , function(err, decoded) {
      Notes.update({_id:req.params.noteid},{$pull:{list:{_id:req.body.taskid}}})
      .then(result=>{
        res.status(200).json({newTask:result})
      }).catch(err=>{
        res.status(400).json({err:err})
      })
    // })
  }

  static toggleTask(req,res){    
    Notes.update({_id:req.params.noteid, "list._id": req.body.taskid } , {$set:{"list.$.completed": req.body.complete }})
    .then(result=>{
      res.status(200).json({togle:result})
    }).catch(err=>{
      res.status(400).json({err:err})
    })
  }


}

module.exports = TodoCtrl;
