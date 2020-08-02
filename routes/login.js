var express = require('express');
var app = express();
var connection = require('../mysql/mysql');
var md5 = require('md5');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var session = require('express-session');

app.use(fileUpload());

var sess ;

app.post('/',(req,res) => {
    var email = req.body.email;
    var pwd = req.body.pwd;
    // var real_pwd = md5(pwd);
    var sql = "SELECT * FROM `shop` WHERE `email` = '"+email+"' AND `pwd` = '"+pwd+"' ";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        if(result.length == 1){
            res.send({
                status1 : 1,
                data:result
            })
        }else{
            res.send({
                status : 0
            })
        }
    })
})

app.post('/admin',(req,res) => {
    var email = req.body.email;
    var pwd = req.body.pwd;
    // var real_pwd = md5(pwd);
    var sql = "SELECT * FROM `admin` WHERE `email` = '"+email+"' AND `password` = '"+pwd+"' ";
    connection.query(sql,(err,result) => {
        // console.log(sql)
        // console.log(result)
        if(err) throw err;
        if(result.length == 1){
            res.send({
                status1 : 1,
                // data:result
            })
        }else{
            res.send({
                status : 0
            })
        }
    })
})

app.post('/customer',(req,res) => {
    var email = req.body.email;
    var pwd = req.body.pwd;
    // var real_pwd = md5(pwd);
    var sql = "SELECT * FROM `customer` WHERE `email` = '"+email+"' AND `pwd` = '"+pwd+"' ";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(sql);
        // console.log(result);
        if(result.length == 1){
            res.send({
                status1 : 1,
                data:result
            })
        }else{
            res.send({
                status : 0
            })
        }
    })
})

app.post('/step1',(req,res) => {
    var sname = req.body.sname;
    var name = req.body.name;
    var phone = req.body.phone;
    var loc = req.body.location;
    var desc = req.body.desc;

    var sql = "INSERT INTO `shop`(`shopname`, `owner`, `phone`, `location`,`description`) VALUES ('"+sname+"','"+name+"','"+phone+"','"+loc+"','"+desc+"')";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(result);
        res.send(result);
        if(result.affectedRows > 0){
            var sql1 = "CREATE TABLE `"+req.body.sname+"_1` ( `id` INT(30) NOT NULL AUTO_INCREMENT , `shop_id` INT(30),`shop_name` VARCHAR(30) NOT NULL, `category` VARCHAR(20) ,`itemtype` VARCHAR(30),`item` VARCHAR(30),`size` VARCHAR(30) NOT NULL ,`size2` VARCHAR(30) NOT NULL ,`size3` VARCHAR(30) NOT NULL ,`size4` VARCHAR(30) NOT NULL ,`size5` VARCHAR(30) NOT NULL ,`size6` VARCHAR(30) NOT NULL ,`suited_yr` VARCHAR(30) NOT NULL ,`colour` VARCHAR(30) NOT NULL ,`colour2` VARCHAR(30) NOT NULL ,`colour3` VARCHAR(30) NOT NULL ,`colour4` VARCHAR(30) NOT NULL ,`brand` VARCHAR(20) NOT NULL , `description` TEXT NOT NULL ,`dprice` VARCHAR(30) NOT NULL ,`price` INT(44) NOT NULL , `image1` VARCHAR(99) NOT NULL , `image2` VARCHAR(40) NOT NULL ,`image3` VARCHAR(99) NOT NULL ,   `avaliable` VARCHAR(44) NOT NULL DEFAULT 'out of stock' , PRIMARY KEY (`id`))";
            connection.query(sql1,(error,result2) => {
                if(error) throw error
                console.log("created");
            })
        }else{
            console.log("something is wrong")
        }
    })
});

app.post('/step2',(req,res) => {
    var email = req.body.email;
    var pwd = req.body.pwd;
    var con_pwd = req.body.con_pwd;
    var real_pwd = md5(con_pwd);
    if(pwd == con_pwd){

    var sql = "UPDATE `shop` SET `email`='"+email+"',`pwd`='"+pwd+"' WHERE `id`='"+req.body.insert_id+"'";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(result);
        res.send(result);
    })
    }else{
        res.send("something Went wrong! Try again");
    }
});

app.post('/step3',(req,res) => {
    var cat1 = req.body.cat1;
    var cat2 = req.body.cat2;
    var cat3 = req.body.cat3;

    var sql = "UPDATE `shop` SET `cat1`='"+cat1+"',`cat2`='"+cat2+"',`cat3`='"+cat3+"' WHERE `id`='"+req.body.insert_id+"'";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(result);
        res.send(result);
    })
});

app.post('/fileupload',(req,res) => {
    // console.log(sess,req.files)
    if(req.files){
            // console.log(req.files);
            var file = req.files.filename;

            var filename1 = sess.filename1
    
            file.mv('./public/images/'+filename1,function(err){
                if(err) {
                    throw err;
                }else{
                    console.log('uploaded1')
                }
            })
           
            res.send({status : 1})
        }
        delete sess.filename1;
        
    
})
app.post('/filemv',function(req,res){
    // console.log(req.files);
    // console.log(req.body);
        sess = req.session;
        var filename1 = req.body.file[0];
        var name1 = filename1.split(".");
        filename1 = req.body.insert_id+`_1`+"."+name1[1]; 
        sess.filename1 = filename1;
       
        var sql = "UPDATE `shop` SET `image`='"+filename1+"' WHERE `id` = '"+req.body.insert_id+"'";
        // console.log(sql)
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
        
})
app.post('/add1',(req,res) => {
    // console.log(req.body)
    var id = req.body.id;
    var sname = req.body.shopname;
    var cat = req.body.cat;
    var itemtype = req.body.itemtype;
    var item = req.body.item;
    var size = req.body.size;
    var size2 = req.body.size2;
    var size3 = req.body.size3;
    var size4 = req.body.size4;
    var size5 = req.body.size5;
    var size6 = req.body.size6;
    var years = req.body.years;
    var colour = req.body.colour;
    var colour2 = req.body.colour2;
    var colour3 = req.body.colour3;
    var colour4 = req.body.colour4;
    var brand = req.body.brand;
    var desc = req.body.desc;
    var avaliable = req.body.avaliable;
    var dprice = req.body.dprice; 
    var price = req.body.price;

    var sql = "INSERT INTO `"+sname+"_1`(`shop_id`, `shop_name`, `category`, `itemtype`, `item`, `size`,`size2`,`size3`,`size4`,`size5`,`size6`, `suited_yr`, `colour`, `colour2`,`colour3`,`colour4`,`brand`, `description`, `dprice`, `price`, `avaliable`) VALUES('"+id+"','"+sname+"','"+cat+"','"+itemtype+"','"+item+"','"+size+"','"+size2+"','"+size3+"','"+size4+"','"+size5+"','"+size6+"','"+years+"','"+colour+"','"+colour2+"','"+colour3+"','"+colour4+"','"+brand+"','"+desc+"','"+dprice+"','"+price+"','"+avaliable+"')";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/addfileupload',(req,res) => {
    // console.log(sess,req.files)
    if(req.files){
            // console.log(req.files);
            var file = req.files.filename[0];
            var file1 = req.files.filename[1];
            var file2 = req.files.filename[2];
            // console.log(file)

            var filename1 = sess.filename1
            var filename2 = sess.filename2
            var filename3 = sess.filename3
            // console.log(filename1)
            // console.log(filename2)
            // console.log(filename3)
    
            file.mv('./public/images/'+filename1,function(err){
                if(err) {
                    throw err;
                }else{
                    console.log('uploaded1')
                }
            })
            file1.mv('./public/images/'+filename2,function(err){
                if(err) {
                    throw err;
                }else{
                    console.log('uploaded2')
                }
            })
            file2.mv('./public/images/'+filename3,function(err){
                if(err) {
                    throw err;
                }else{
                    console.log('uploaded3')
                }
            })
            res.send({status : 1})
        }
        delete sess.filename1;
        delete sess.filename2;
        delete sess.filename3;
    
})
app.post('/addfile',function(req,res){
    // console.log(req.files);
    // console.log(req.body);
        sess = req.session;
        var filename1 = req.body.file[0];
        var filename2 = req.body.file[1];
        var filename3 = req.body.file[2];
        var name1 = filename1.split(".");
        var name2 = filename2.split(".");
        var name3 = filename3.split(".");
        filename1 = req.body.insert_id+"_"+req.body.shopname+`_1`+"."+name1[1]; 
        filename2 = req.body.insert_id+"_"+req.body.shopname+`_2`+"."+name2[1];
        filename3 = req.body.insert_id+"_"+req.body.shopname+`_3`+"."+name3[1];
        // console.log(filename1,filename2,filename3); 
        sess.filename1 = filename1;
        sess.filename2 = filename2;
        sess.filename3 = filename3;

        var sql = "UPDATE `"+req.body.shopname+"_1` SET `image1`='"+filename1+"',`image2`='"+filename2+"',`image3`='"+filename3+"' WHERE `id` = '"+req.body.insert_id+"'";
        // console.log(sql)
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
        
})

app.post('/shopDetail',(req,res) => {
    
    var id = req.body.id;
    // console.log(req.body)
    var sql = "SELECT * FROM `shop` WHERE `id` = '"+id+"'";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        if(result.length == 1){
            res.send({
                
                result
            })
        }
    })
})

app.post('/updateDelivery',(req,res) => {
    // console.log(req.body);
    var del1 = req.body.del1;
    var del2 = req.body.del2;
    var del3 = req.body.del3;
    var question = req.body.question;
    var update = 1
    // console.log(del1);
    var sql = "UPDATE `shop` SET `delivery1`='"+del1+"',`delivery2`='"+del2+"',`delivery3`='"+del3+"',`question`='"+question+"',`updateStatus`='"+update+"' WHERE `id` = '"+req.body.id+"'";
    // console.log(sql)
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        // console.log(result.length)
        if(result.affectedRows == 1){
            res.send({
                status : 1,
            })
        }else{
            res.send({
                status : 0
            })
        }
    })
})

app.post('/getDbdata',(req,res) => {
    var shop = req.body.shop;
    var sql = "SELECT * FROM `"+shop+"_1` ORDER BY 'DESC'";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/delete',(req,res,next) =>{
    // console.log(req.body);
    // console.log(req.body.id,req.body.shop);
    var id = req.body.id;
    var sql = "SELECT `image1`,`image2`,`image3` FROM `"+req.body.shop+"_1` WHERE `id` = '"+id+"'";
    connection.query(sql,(err,result) => {
        console.log(result)
        // console.log(console.log(sql))
        if(err) throw err;
        if(result[0].image1 == '' &&result[0].image1 == ''&&result[0].image1 == ''){
            var sql2 = "DELETE FROM `"+req.body.shop+"_1` WHERE `id` = '"+id+"'";
            connection.query(sql2,(error1,result12) => {
            if(error1) throw error1;
            if(result12.affectedRows == 1){
                res.send({status : 1})
            }else{
                res.send({status : 2})
            }
        })
        }else{
        fs.unlink('public/images/'+result[0].image1,function(err){
            if(err)throw err;
            console.log('File1 deleted');
        })
        fs.unlink('public/images/'+result[0].image2,function(err){
            if(err)throw err;
            console.log('File2 deleted');
        })
        fs.unlink('public/images/'+result[0].image3,function(err){
            if(err)throw err;
            console.log('File3 deleted');
        })
        var sql1 = "DELETE FROM `"+req.body.shop+"_1` WHERE `id` = '"+id+"'";
        connection.query(sql1,(error,result1) => {
            if(error) throw error;
            if(result1.affectedRows == 1){
                res.send({status : 1})
            }else{
                res.send({status : 2})
            }
        })
    }
    })
});

app.post('/getdata',(req,res) => {
    var shop = req.body.shop;
    var sql = "SELECT * FROM `"+shop+"_1` WHERE `id`='"+req.body.id+"'";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/edit',(req,res) => {
    var cat = req.body.cat;
    var itemtype = req.body.itemtype;
    var item = req.body.item;
    var size = req.body.size;
    var size2 = req.body.size2;
    var size3 = req.body.size3;
    var size4 = req.body.size4;
    var size5 = req.body.size5;
    var size6 = req.body.size6;
    var years = req.body.years;
    var colour = req.body.colour;
    var colour2 = req.body.colour2;
    var colour3 = req.body.colour3;
    var colour4 = req.body.colour4;
    var brand = req.body.brand;
    var desc = req.body.desc;
    var avaliable = req.body.avaliable;
    var dprice = req.body.dprice; 
    var price = req.body.price;

    var sql = "UPDATE `"+req.body.shopname+"_1` SET `category`='"+cat+"', `itemtype`='"+itemtype+"', `item`='"+item+"', `size`='"+size+"',`size2`='"+size2+"',`size3`='"+size3+"',`size4`='"+size4+"',`size5`='"+size5+"',`size6`='"+size6+"', `suited_yr`='"+years+"', `colour`='"+colour+"',`colour2`='"+colour2+"',`colour3`='"+colour3+"',`colour4`='"+colour4+"', `brand`='"+brand+"', `description`='"+desc+"', `dprice`='"+dprice+"', `price`='"+price+"', `avaliable`='"+avaliable+"'  WHERE `id` = '"+req.body.id+"'";
        // console.log(sql)
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
})

app.get('/shopTotal',(req,res) => { 
    var status = 0;
    var sql = "SELECT * FROM `shop` WHERE `status` = '"+status+"' ORDER BY 'DESC'";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/AproovedDetails',(req,res) => {
    var status = 1;
    var sql = "SELECT * FROM `shop` WHERE `status` = '"+status+"' ORDER BY 'DESC'";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/approve',(req,res) => {
    var status = 1;
    var sql = "UPDATE `shop` SET `status`='"+status+"' WHERE `id` = '"+req.body.id+"'";
    connection.query(sql,(error,result1) => {
        if(error) throw error;
        if(result1.affectedRows == 1){
            res.send({status : 1})
        }else{
            res.send({status : 2})
        }
    })
})

app.post('/unapprove',(req,res) => {
    var status = 0;
    var sql = "UPDATE `shop` SET `status`='"+status+"' WHERE `id` = '"+req.body.id+"'";
    connection.query(sql,(error,result1) => {
        // console.log(sql)
        if(error) throw error;
        if(result1.affectedRows == 1){
            res.send({status : 1})
        }else{
            res.send({status : 2})
        }
    })
})
module.exports = app;