const mysql= require("mysql");
//MySQL
const con = mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})
exports.view = (req, res) => {
    // Get the page and limit from the request query, default to page 1 and limit 15 if not provided
    let page = parseInt(req.query.page) || 1;
    let limit = 15; // Updated to 15 records per page
    let offset = (page - 1) * limit;

    // Check database connection
    con.getConnection((err, connection) => {
        if (err) throw err;
        
        // Count total number of rows
        connection.query("SELECT COUNT(*) AS count FROM user", (err, countResult) => {
            if (err) {
                connection.release();
                console.log("Error in counting data: " + err);
                return res.status(500).send("Internal Server Error");
            }

            let totalRows = countResult[0].count;
            let totalPages = Math.ceil(totalRows / limit);

            // Fetch the data with limit and offset
            connection.query("SELECT * FROM user LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
                connection.release();
                if (!err) {
                    res.render("home", {
                        rows,
                        currentPage: page,
                        totalPages: totalPages,
                        limit: limit
                    });
                } else {
                    console.log("Error in listing data: " + err);
                }
            });
        });
    });
}

exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        const {name,age,city}=req.body;

        connection.query("insert into user (NAME,AGE,CITY) values (?,?,?)",[name,age,city] ,(err,rows)=>{
            connection.release();
            if(!err ){
                res.render("adduser",{msg:"user details add successfully"});
            }else{
                console.log("error in listing data "+err);
            }
        })
    }) 
}
exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        //get ID from url
        let id=req.params.id;
        connection.query("select * from user where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err ){
                res.render("edituser",{rows});
            }else{
                console.log("error in listing data "+err);
            }
        })
    }) 
    
}

exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        const {name,age,city}=req.body;
        let id=req.params.id;

        connection.query("update user set  NAME=?,AGE=?,CITY=? where ID=?",[name,age,city,id] ,(err,rows)=>{
            connection.release();
            if(!err ){

                con.getConnection((err,connection)=>{
                    if(err) throw err
                    //get ID from url
                    let id=req.params.id;
                    connection.query("select * from user where id=?",[id],(err,rows)=>{
                        connection.release();
                        if(!err ){
                            
                            res.render("edituser",{rows,msg:"user details Updated successfully"});
                        }else{
                            console.log("error in listing data "+err);
                        }
                    })
                })    
                
            }else{
                console.log("error in listing data "+err);
            }
        })
    }) 
}

exports.delete=(req,res)=>{
con.getConnection((err,connection)=>{
if(err) throw err
let id=req.params.id;
connection.query("delete from user where id=?",[id],(err,rows)=>{
    connection.release();
    if (!err){
res.redirect("/");
    }else{
        console.log(err);
    }
})
})
};
