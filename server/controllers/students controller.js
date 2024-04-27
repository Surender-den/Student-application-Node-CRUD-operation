const mysql= require("mysql");
//MySQL
const con = mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})
exports.view=(req,res)=>{
    //check Database connection
con.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from user" ,(err,rows)=>{
        connection.release();
        if(!err ){
            res.render("home",{rows});
        }else{
            console.log("error in listing data "+err);
        }
    })
}) 
   
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
                res.render("adduser",{msg:"user details add sucessfully"});
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
                            
                            res.render("edituser",{rows,msg:"user details Updated sucessfully"});
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