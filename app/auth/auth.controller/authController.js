/*
Author (Rajat chauhan)

emailId : rajatchauhan527@gmail.com

*/

const { BAD_REQUEST, SUCCESS_STATUS } = require('../../../helper/statusCode');
const AUTH_MODEL = require('../auth.model/authModel')
const bcrypt = require("bcrypt")
const process = require('process')
require("dotenv").config();
const jwt = require('jsonwebtoken')

const auth = {};


/**
 * Signup  USER
 * @param {*} req.body 
 */

auth.signup = async (req, res) => {
    try {
        let data = req.body
        let existingUserDetail = await AUTH_MODEL.findOne({ email: data.email })
        if (existingUserDetail) {
            res.status(BAD_REQUEST).send({
                success: false,
                message: "Email already exist"
            })
            return
        }
        if (!(data.email && data.password)) {
            res.status(BAD_REQUEST).send({
                success: false,
                message: "Email or password not found"
            })
        }

        else {
            // bcrypt password
            const hash = await bcrypt.hash(data.password, 10);
            // save hash password
            data.password = hash
            let saveUserDetails = await AUTH_MODEL.create(data)
            if (saveUserDetails) {
                res.status(SUCCESS_STATUS).send({
                    success: true,
                    message: "User signup successfully",
                    data: saveUserDetails
                })
            }
            else {
                res.status(BAD_REQUEST).send({
                    success: false,
                    message: "Something went wrong! please try again"
                })
            }
        }

    }
    catch (err) {
        console.log(err)
        res.send({
            message: err.message
        })
    }

}


/**
 * Login  USER
 * @param {*} req.body 
 */

auth.login = async (req, res) => {
    try {
        let data = req.body
        let existingUser = await AUTH_MODEL.findOne({ email: data.email })
        if (!existingUser) {
            res.status(BAD_REQUEST).send({
                success: false,
                message: "User not found"
            })

        }
        else {

            // compare password
            const result = await bcrypt.compare(data.password, existingUser.password);
            if (result) {
                // send detail of user in token
                tokenPayload = {
                    userId: existingUser._id,
                    role: existingUser.role,
                    email: existingUser.email

                }
                // Create token
                const jwtToken = jwt.sign(
                    tokenPayload,
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                // save user token

                let saveTokenInUseCredential = await AUTH_MODEL.findOneAndUpdate({ email: data.email }, { token: jwtToken })
                if (saveTokenInUseCredential) {
                    let detail = await AUTH_MODEL.findOne({email:data.email})

                    res.status(SUCCESS_STATUS).send({
                        success: true,
                        message: "user login successfully",
                        data: detail
                    })
                }
                else {
                    res.status(BAD_REQUEST).send({
                        success: false,
                        message: "Login failed"
                    })
                }


            }
            else {
                res.status(BAD_REQUEST).send({
                    success: false,
                    message: "Password not match"
                })
            }
        }

    }
    catch (err) {
        console.log("err", err)
        res.status(BAD_REQUEST).send({
            message: err.message
        })

    }
}

/*

let arr = [
  {
    name: "rajat",
    products: [
      {
        title: "product1",
        stateId: 1
      },
      {
        title: "product2",
        stateId: 2
      },
      {
        title: "product2",
        stateId: 1
      }
    ],
    stateId: 2
  },

  {
    name: "shivam",
    products: [
      {
        title: "pr1",
        stateId: 2
      },
      {
        title: "pr2",
        stateId: 2
      },
      {
        title: "pr3",
        stateId: 2
      }
    ],
    stateId: 1
  },
  {
    name: "ttrt",
    products: [
      {
        title: "pr001",
        stateId: 3
      },
      {
        title: "pr222",
        stateId: 3
      },
      {
        title: "pr333",
        stateId: 2
      }
    ],
    stateId: 8
  },
];

for (let i = 0; i < arr.length; i++) {
  const products = arr[i].products;
  const productStateIds = products.map(product => product.stateId);
  
  if (productStateIds.every(stateId => stateId === 1)) {
    arr[i].stateId = 3;
  } else if (productStateIds.every(stateId => stateId === 2)) {
    arr[i].stateId = 1;
  } else if (productStateIds.every(stateId => stateId === 3)) {
    arr[i].stateId = 1;
  }
}

console.log(arr);



*/




/*
let arr = [
  {
    name: "rajat",
    products: [
      {
        title: "product1",
        stateId: 1
      },
      {
        title: "product2",
        stateId: 2
      },
      {
        title: "product2",
        stateId: 2
      }
    ],
    stateId: 3
  },

  {
    name: "shivam",
    products: [
      {
        title: "pr1",
        stateId: 2
      },
      {
        title: "pr2",
        stateId: 2
      },
      {
        title: "pr3",
        stateId: 2
      }
    ],
    stateId: 1
  },
  {
    name: "tolla",
    products: [
      {
        title: "clo1",
        stateId: 4
      },
      {
        title: "clo2",
        stateId: 4
      },
      {
        title: "clo3",
        stateId: 4
      }
    ],
    stateId: 1
  },
];

for (let i = 0; i < arr.length; i++) {
  const products = arr[i].products;
  const firstProductId = products[0].stateId;
  let allSame = true;

  for (let j = 1; j < products.length; j++) {
    if (products[j].stateId !== firstProductId) {
      allSame = false;
      break;
    }
  }

  if (allSame) {
    arr[i].stateId = firstProductId;
  }
}

console.log(arr);
*/
/*
Could you please provide me with the BharatPe login credentials and AWS secret key so that I can proceed with checking the further workflow?
Having successfully validated all the workflows, what should be my next step? Should I proceed with PhonePe scraping, or explore another payment provider?"
Good morning! I'm good, how about you?
Currently, I am working on the IndiaPe project, but I haven't received the ticket yet, and I also don't have access to Zoho. This week, I have also worked on these projects. If there's another project or any work involving Node.js, please do let me know.

Can i come  to discuss related to project workflow

Do I need to work on the same project this week as well?
*/

/*

let arr1 = [
  {
    id: 1,
    name: "rajat",
    products: {
      title: "product1",
      stateId: 1
    },
    stateId: 3
  },
  {
    id: 1,
    name: "rajat",
    products: {
      title: "product2",
      stateId: 1
    },
    stateId: 3
  },
  {
    id: 1,
    name: "rajat",
    products: {
      title: "product3",
      stateId: 1
    },
    stateId: 3
  },
  {
    id: 2,
    name: "rajat2",
    products: {
      title: "product33",
      stateId: 1
    },
    stateId: 2
  }
];

let combinedArr = [];

for (let i = 0; i < arr1.length; i++) {
  const existingItem = combinedArr.find(item => item.id === arr1[i].id && item.name === arr1[i].name);

  if (existingItem) {
    existingItem.products.push(arr1[i].products);
  } else {
    const newItem = {
      id: arr1[i].id,
      name: arr1[i].name,
      products: [arr1[i].products],
      stateId: arr1[i].stateId
    };
    combinedArr.push(newItem);
  }
}

for (let i = 0; i < combinedArr.length; i++) {
  const products = combinedArr[i].products;
  const productStateIds = products.map(product => product.stateId);

  if (productStateIds.every(stateId => stateId === 1)) {
    combinedArr[i].stateId = 3;
  } else if (productStateIds.every(stateId => stateId === 2)) {
    combinedArr[i].stateId = 1;
  } else if (productStateIds.every(stateId => stateId === 3)) {
    combinedArr[i].stateId = 1;
  }
}

console.log(combinedArr);


*/


module.exports = auth
