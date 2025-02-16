const express = require('express');
const exphbs =  require("express-handlebars");
const bodyParser=require("body-parser");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');


require('dotenv').config();

const appy = express();




const port=process.env.PORT || 5000;
appy.use(bodyParser.urlencoded({extended:false}
))
appy.use(bodyParser.json());


//static files
appy.use(express.static("public"));
// Handlebars helpers
const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        add: (a, b) => a + b,
        sub: (a, b) => a - b,
        eq: (a, b) => a === b,
        gt: (a, b) => a > b,
        lt: (a, b) => a < b,
        in: (currentpage, list) => list.includes(currentpage),
        
        range: (n) => {
            let arr = [];
            for (let i = 1; i <= n; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
    
    extname:".hbs"
});
//template engine
// const handlebars = exphbs.create({});
appy.engine('hbs',hbs.engine);
appy.set("view engine","hbs"); 

// //MySQL
// const con = mysql.createPool({
//     connectionLimit:10,
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.DB_NAME
// })
// //check Database connection
// con.getConnection((err,connection)=>{
//     if(err) throw err
//     console.log("connection sucess");
// })
// pool.query('SELECT * FROM your_table', (error, results, fields) => {
//     if (error) {
//         console.error('Error executing query:', error);
//         return;
//     }
//     console.log('Query results:', results);
// });


//Router
// appy.get('/',(req,res)=>{
//     res.render("home")
// });

const routes = require('./server/routes/student');

appy.use('/', routes);





// Listen Port
appy.listen(port,()=>{
console.log("listening port :" + port);    

})