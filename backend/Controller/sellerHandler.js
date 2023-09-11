const sellerModule = require("../schema/seller");
const bcrypt = require("bcrypt");

// function CheckPassword(inputtxt) {
//     var passw = /[A-Za-z]{6,14}/;
//     console.log(inputtxt);
//     if (inputtxt.match(passw)) {
//         return true;
//     }
//     else {
//         console.log("er");
//         return false;
//     }
// }

module.exports.sellerSignUp = async (req, res) => {

    // if (!CheckPassword(req.body.password)) {
    //     return;
    // }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const email = (req.body.email).toLowerCase();
        const name = req.body.name;
        const password = hash;
        sellerModule.create({
            name: name,
            email: email,
            password: password,
        })
        .then((result) => {
            console.log(result);
            r = {
              msg: "user created"
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

module.exports.sellerLogin = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    sellerModule
            .findOne({email})
            .then(result=>{
                if(result===null){
                    res.status(409).send({
                        msg: "No User Exist",
                      });
                      return;
                }
                bcrypt.compare(password,result.password)
                    .then(c=>{
                        if(c==true){
                            res.status(200).send({
                                id: result._id,
                                msg: "login successfull",
                                name: result.name
                              });
                        }
                        else{
                            console.log("Wrong Password");
                            res.status(502).json({
                              error: err,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("error logging in");
                        res.status(500).json({
                          error: err,
                        });
                      });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                  msg: err,
                });
              });
}