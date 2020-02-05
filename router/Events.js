const Events = require('../models/Events')

class EventsDetail {
    findEvents (req, res) {
        Events.find(function (err, events) {
            if (err) return console.error(err);
            let eventsDetails = events
            res.status(200).json(eventsDetails)
          })
    }
    usersEvents (req, res) {
     let userId = req.params.userId
     Events.find({})
     .then((events)=> {
       let praticipateUser = events.filter(el => el.users.includes(userId))
       res.status(200).json(praticipateUser)
     })
    }
    findOneUser (req, res) {
        let userId = req.params.id
        Events.findById(userId)
        .then((user)=> {
          res.status(200).json(user)
        })
        .catch((err)=> {
          console.log(err)
        })
         
      }
      addEvents (req, res, next) {
        console.log(req.body.file)
             var eventData = {
             eventName: req.body.eventName,
             address: req.body.address,
             phone: req.body.phone,
             slogan: req.body.slogan,
             date: req.body.date,
             time: req.body.time
             
           }
           Events.create(eventData, function (err, event) {
             if (err) {
               console.log('You are erro')
               next(err)
               console.log(err)
             } else {
               return res.status(201).json(event);
             }
             next();
           });
         
   }
  
   updateEvents (req, res) {
    let eventsId = req.params.id
    // if(mongoose.Types.ObjectId.isValid(eventsId)) {
      Events.findOneAndUpdate({_id: eventsId},
        {
          $set:{
            eventName:req.body.eventName,
            address: req.body.address,
             phone: req.body.phone,
             slogan: req.body.slogan,
             date: req.body.date,
             time: req.body.time,
             users: req.body.users
          }
      },{new:true})
         .then((events)=>{
         if(events) {
            res.status(200).json({success:true, data:events});
         }
     }).catch((err)=>{
        console.log(err)
     })
    //  } else {
    //     reject({success:"false",data:"provide correct key"});
    //  }
   }
   deleteEvents (req, res) {
     let eventId = req.params.id
    // if(mongoose.Types.ObjectId.isValid(eventId)) {
      Events.findOneAndRemove({_id: eventId})
        .then((docs)=>{
              res.json({"success":true, data:docs});        
      }).catch((err)=>{
          console.log(err);
      })
    // } else {
    //     reject({"success":false,data:"please provide correct Id"});
    // }
   }
}


module.exports =  EventsDetail;