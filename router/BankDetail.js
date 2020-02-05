const BloodBanks = require('../models/BankDetail')
const {check, validationResult} = require('express-validator/check'); 

class BanksDetail {
    findBank (req, res) {
        BloodBanks.find(function (err, details) {
            if (err) return console.error(err);
            let bankdetails = details
            res.status(200).json(bankdetails)
          })
    }
    findOneUser (req, res) {
        let userId = req.params.id
        User.findById(userId)
        .then((user)=> {
          res.status(200).json(user)
        })
        .catch((err)=> {
          console.log(err)
        })
         
      }
     async addBankInfo (req, res, next) {
       console.log(req.body)
             let bankData = {
             bloodBank: req.body.bloodBank,
             address: req.body.address,
             phone: req.body.phone,
             stock: req.body.stock
           }
           console.log(bankData)
           await check('bloodBank').exists().isLength({min:5}).withMessage("Must not be Empty.");
           await check('phone').exists().isLength({min:5}).withMessage("Must not be Empty.");
           await check('address').exists().isLength({min:5}).withMessage("Must not be Empty.");
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
           }
          else {
            BloodBanks.create(bankData, function (err, event) {
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
          
         
   }
   updateBanks (req, res) {
    let bankId = req.params.id
    // if(mongoose.Types.ObjectId.isValid(bankId)) {
      BloodBanks.findOneAndUpdate({_id: bankId},
        {
          $set:{
            bloodBank:req.body.bloodBank,
            address: req.body.address,
             phone: req.body.phone,
             stock: req.body.stock
          }
      },{new:true})
         .then((events)=>{
         if(events) {
            res.status(200).json({success:true, data:events});
         } else {
            res.json({success:false, data:"no such events exist"});
         }
     }).catch((err)=>{
        console.log(err);
     })
    //  } else {
    //     reject({success:"false",data:"provide correct key"});
    //  }
   }
   deleteBank (req, res) {
    let bankId = req.params.id
    // if(mongoose.Types.ObjectId.isValid(bankId)) {
      BloodBanks.findOneAndRemove({_id: bankId})
        .then((docs)=>{
           if(docs) {
              res.json({"success":true, data:docs});
           }
        //    } else {
        //       res.json({"success":false,data:"no such user exist"});
        //    }
      }).catch((err)=>{
          console.log(err);
      })
    // } else {
    //     reject({"success":false,data:"please provide correct Id"});
    // }
   }
}


module.exports = BanksDetail;