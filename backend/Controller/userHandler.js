const userModule = require("../schema/user");
const bcrypt = require("bcrypt");

// function CheckPassword(inputtxt) {
//     var passw = /[A-Za-z]{6,14}/;
//     console.log(inputtxt);
//     if (inputtxt.match(passw)) {
//         return true;
//     }
//     else {
//         console.log("Password Not Strong Enough");
//         return false;
//     }
// }

module.exports.userSignUp = async (req, res) => {

    // if (!CheckPassword(req.body.password)) {
    //     return;
    // }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const email = (req.body.email).toLowerCase();
        const name = req.body.name;
        const password = hash;
        userModule.create({
            name: name,
            email: email,
            password: password,
        })
        .then((result) => {
            console.log(result);
            r = {
              msg: "user created",
              result,
            };
    
            res.status(201).send(r);
          })
          .catch((error) => {
            const msg =
              error.code === 11000
                ? "Email Already Exixt"
                : " ValidatorError: please Enter valid Email";
    
            console.log("error code occured is", error);
            r = {
              error: "Email Already Exist",
              msg: msg,
            };
    
            res.status(403).send(r);
          });
    })
}

module.exports.userLogin = async (req,res)=>{
    const email = (req.body.email).toLowerCase();
    const password = req.body.password;
    userModule
  .findOne({ email })
  .then((result) => {
    if (result === null) {
      res.sendStatus(404); // User not found
      return;
    } else {
      bcrypt.compare(password, result.password).then((c) => {
        console.log(result)
        if (c == true) {
          res.status(200).send({
            name: result.name,
            id:result.id,
          });
        } else {
          console.log("Wrong password");
          res.sendStatus(401); // Unauthorized
        }
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({
      msg: err,
    });
  });

}

module.exports.getUser = async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    userModule.findById(id)
      .then((result)=>{
        if(result === null){
          res.sendStatus(404);
          return;
        }
        else{
          console.log(result)
          res.status(200).send({
            name: result.name,
            cart: result.cart,
        });
        }
      })
      .catch(err=>{
        res.status(400).send({
          error:err
        })
      })
}