import jwt from "jsonwebtoken";
import axios from 'axios'
import jwt_decode from 'jwt-decode'
//user want delete post
//go to middleware and check he has pemssion to delete it
const secret = 'test';

const auth = async (req, res, next) => {
 
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    const isCustomAuth = token.length > 220;

    let decodedData;

    if (token && isCustomAuth) {   
      console.log('custom')
      decodedData = jwt.verify(token, secret);
     
      req.userId = decodedData?.id;
    } else {
      req.userId = token
      //req.userId = decodedData?.sub;
    
    //   axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // }).then(async response=>{
    //   //console.log(response?.data.sub)
    //    getData(response.data.sub)
    // })
    // console.log(id)
   
    }    

    next();
  } catch (error) {
  
    console.log(error);
  }
};

export default auth;