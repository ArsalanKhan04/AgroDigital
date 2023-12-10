const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const config = {
   //// user : 'DESKTOP-LD72PLD\\hp',
  //  password : '',
    server: 'DESKTOP-LD72PLD',
    database: 'agroace',
    options: {
    //   encrypt: true,
      trustServerCertificate: true,
      trustedConnection: true
    }
  };
  
const pool = new sql.ConnectionPool(config);

pool.connect(err => {
  if (err) {
    console.log(`Error connecting to SQL Server: ${err}`);
  } else {
    console.log('Connected to SQL Server');
  }
});

  app.use(bodyParser.json()); 
  app.use(cors());

app.post("/server/login",(req,res)=>{
 
  const username = req.body.username 
    const password = req.body.password
    const status = 0;  
    console.log("in Server");
    console.log("Username : ",username);
    console.log("Password : ",password); 
    let LoginStatus = 0 ;
    const request = new sql.Request(pool)
      .input('e',sql.VarChar(50),username)
      .input('p',sql.VarChar(20),password)
      .output('status',sql.VarChar(20))
      .execute('LoginValidation') ; 

      request.then(request =>
      {
        LoginStatus = request.output.status ; 
           console.log("Login Status : ",LoginStatus);
          if(LoginStatus == 1)
          {
            res.send("VALID"); 
          }else
          {
            res.send("INVALID");
          }
          }); 

      //  const LoginStatus =  .then(request.status);
     

  // console.log(request);

    // declare @status int 
// exec LoginValidation @e = 'riyan@gmail.com' ,@p = '123',@r='farmer',@status=@status output
// select @status

    // res.send("OK");
})


app.post('/server/getUserData'),(req,res)=>
{
    const email = req.body.email ; 
    console.log(email);
     const request = new sql.Request(pool) 
     .query("SELECT * from farmer")
     .input("email",sql.VarChar(50),email)
     .query("select * from retrieveUserData(email)",(err,result)=>{
      request.then(request =>
        {
          console.log(request);
        })
    //     // console.log(result); 
  res.send("Post");
   // });
};

  const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

  
