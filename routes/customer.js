var express = require('express');
var app = express();
var connection = require('../mysql/mysql');
var md5 = require('md5');

app.post('/',(req,res) => {
    var id = req.body.cid;
    var sql = "SELECT * FROM  `customer` WHERE `id`='"+id+"'";
     connection.query(sql,(err,result) => {
         if(err) throw err;
         if(result.length == 1){
             res.send({
                 status1:1,
                 result

             })
         }else{
             res.send({status:0})
         }
     })
})

app.post('/register',(req,res) => {
    var name=req.body.name;
    var phone=req.body.phone;
    var gender=req.body.gender;
    var email=req.body.email;
    var pwd=req.body.pwd;
    var c_pwd=req.body.c_pwd;
    var real_pwd=md5(pwd);
    if(pwd == c_pwd){
        var sql = "INSERT INTO `customer`(`name`, `Gender`, `phone`, `email`, `pwd`) VALUES('"+name+"','"+gender+"','"+phone+"','"+email+"','"+pwd+"')";
            connection.query(sql,(err,result) => {
                if(err) throw err;
                if(result.affectedRows == 1){
                res.send({
                    // status1: 1,
                    result
                })
            }else{
                res.send({status:2})
            }
            })
    }else{
        res.send({
            status : 0
        })
    }
});

app.post('/update',(req,res) => {
    var hno = req.body.hno;
    var area = req.body.area;
    var city = req.body.city;
    var pincode = req.body.pincode;
    var question = req.body.question;
    var update = 1
    // console.log(del1);
    var sql = "UPDATE `customer` SET `Hno`='"+hno+"',`area`='"+area+"',`city`='"+city+"',`pincode`='"+pincode+"',`question`='"+question+"',`updateStatus`='"+update+"' WHERE `id` = '"+req.body.id+"'";
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

app.post('/Details',(req,res) => {
    var id = req.body.id;
    // console.log(req.body)
    var sql = "SELECT * FROM `customer` WHERE `id` = '"+id+"'";
    connection.query(sql,(err,result) => {
        if(err) throw err;
        if(result.length == 1){
            res.send({
                
                result
            })
        }
    })
})

app.post('/search',(req,res) => {
    // console.log(req.body.loc);
    var search = req.body.loc;
    var sql = "SELECT id,shopname,location FROM `shop` WHERE `location` LIKE '%"+search+"%' LIMIT 25";
    
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(result)
        if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.send({
                status: 0
            })
        }
    })
})

app.post('/search1',(req,res) => {
    // console.log(req.body.loc);
    var search = req.body.search;
    // var sql = "SELECT * FROM `"+req.body.shop+"_1` WHERE `category` LIKE CONCAT('%"+search+"%') OR `brand` LIKE CONCAT('%"+search+"%')  LIMIT 25";
    var sql = "SELECT id,category,shop_name FROM `"+req.body.shop+"_1` WHERE `category` LIKE '%"+search+"%' LIMIT 25";
    
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(result)
        if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.send({
                status: 0
            })
        }
    })
})

app.post('/search2',(req,res) => {
    // console.log(req.body.loc);
    var search = req.body.search;
    // var sql = "SELECT * FROM `"+req.body.shop+"_1` WHERE `category` LIKE CONCAT('%"+search+"%') OR `brand` LIKE CONCAT('%"+search+"%')  LIMIT 25";
    var sql = "SELECT id,item,shop_name,category FROM `"+req.body.shop+"_1` WHERE `item` LIKE '%"+search+"%' AND `category`='"+req.body.cat+"' LIMIT 25";
    
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(result)
        if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.send({
                status: 0
            })
        }
    })
})

app.post('/search3',(req,res) => {
    // console.log(req.body.loc);
    var search = req.body.search;
    // var sql = "SELECT * FROM `"+req.body.shop+"_1` WHERE `category` LIKE CONCAT('%"+search+"%') OR `brand` LIKE CONCAT('%"+search+"%')  LIMIT 25";
    var sql = "SELECT id,size,size2,size3,size4,size5,size6,category,shop_name,item FROM `"+req.body.shop+"_1` WHERE (`size` LIKE '%"+search+"%' OR `size2` LIKE '%"+search+"%' OR `size3` LIKE '%"+search+"%' OR `size4` LIKE '%"+search+"%' OR `size5` LIKE '%"+search+"%' OR `size6` LIKE '%"+search+"%') AND `item`='"+req.body.item+"' AND `category`='"+req.body.cat+"' LIMIT 25";
    
    connection.query(sql,(err,result) => {
        if(err) throw err;
        // console.log(result)
        if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.send({
                status: 0
            })
        }
    })
})

app.post('/shopDetails',(req,res) => {
    // console.log(req.body);
    var shop = req.body.shop;
    var sql = "SELECT * FROM `shop` WHERE `shopname`='"+shop+"' ";
        connection.query(sql,(err,result) => {
            if(err) throw err;
            if(result.length == 1){
                res.send({
                    status1 : 1,
                    result
                })
            }else{
                res.send({
                    status:0
                })
            }            
        })
})

app.post('/order',(req,res) => {
    // console.log(req.body);
    var delivery_b = req.body.delivery_b;
    var del = delivery_b[Math.floor(Math.random()*delivery_b.length)];
    // console.log(del);
    var shop_id = req.body.shop_id;
    var shop= req.body.shop;
    var item_id = req.body.id;
    var item_price = req.body.price;
    var size = req.body.size;
    var colour = req.body.colour;
    var image= req.body.Data[0].image1;
    var s_email = req.body.s_email;
    var s_name = req.body.owner;
    var s_phone= req.body.s_phone;
    var customer_id=req.body.cid;
    var c_name=req.body.c_name;
    var c_email=req.body.c_email;
    var c_phone=req.body.c_phone;
    var hno=req.body.hno;
    var area=req.body.area;
    var city=req.body.city;
    var payment=req.body.payment;

    var sql="INSERT INTO `orders`(`cutomer_id`, `shop_id`, `item_id`, `item_image`,`item_price`, `shop`, `s_owner`, `s_email`, `s_phone`, `item_colour`, `item_size`, `c_name`, `c_email`, `c_phone`, `hno`, `area`, `city`, `delivery_boy`, `payment`) VALUES('"+customer_id+"','"+shop_id+"','"+item_id+"','"+image+"','"+item_price+"','"+shop+"','"+s_name+"','"+s_email+"','"+s_phone+"','"+colour+"','"+size+"','"+c_name+"','"+c_email+"','"+c_phone+"','"+hno+"','"+area+"','"+city+"','"+del+"','"+payment+"')";
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows == 1){
                res.send({
                    status1:1
                })
            }else{
                res.send({
                    status:0
                })
            }
        })
})

app.post('/orderData',(req,res)=>{
    var sql =" SELECT * FROM `orders` WHERE `cutomer_id`='"+req.body.cid+"'";
     connection.query(sql,(err,result) => {
         if(err) throw err;
         if(result.length > 0){
              res.send({
                  status:1,
                  result
              })
         }else{
             res.send({
                 status:0
             })
         }
     })
})
app.post('/s_order',(req,res)=>{
    var sql =" SELECT * FROM `orders` WHERE `shop`='"+req.body.shop+"'";
     connection.query(sql,(err,result) => {
         if(err) throw err;
         if(result.length > 0){
              res.send({
                  status:1,
                  result
              })
         }else{
             res.send({
                 status:0
             })
         }
     })
})
app.post('/cancelOrder',(req,res) => {
    var sql = "DELETE FROM `orders` WHERE `orders`.`order_id` ='"+req.body.order_id+"' ";
        connection.query(sql,(err,result)=>{
            // console.log(sql)
            if(err) throw err;
            if(result.affectedRows == 1){
                res.send({
                    status:1
                })
            }else{
                res.send({
                    status:0
                })
            }
        })
})
app.post('/approoval',(req,res) => {
    var status = 1
    var sql = "UPDATE `orders` SET `status`='"+status+"'  WHERE `order_id` = '"+req.body.id+"'";
        connection.query(sql,(err,result)=>{
            // console.log(sql)
            if(err) throw err;
            if(result.affectedRows == 1){
                res.send({
                    status:1
                })
            }else{
                res.send({
                    status:0
                })
            }
        })
})
app.post('/cancel',(req,res) => {
    var status = 2
    var sql = "UPDATE `orders` SET `status`='"+status+"'  WHERE `order_id` = '"+req.body.id+"'";
        connection.query(sql,(err,result)=>{
            // console.log(sql)
            if(err) throw err;
            if(result.affectedRows == 1){
                res.send({
                    status:1
                })
            }else{
                res.send({
                    status:0
                })
            }
        })
})
app.post('/complete',(req,res) => {
    var status = 3
    var sql = "UPDATE `orders` SET `status`='"+status+"'  WHERE `order_id` = '"+req.body.id+"'";
        connection.query(sql,(err,result)=>{
            // console.log(sql)
            if(err) throw err;
            if(result.affectedRows == 1){
                res.send({
                    status:1,
                    result
                })
            }else{
                res.send({
                    status:0
                })
            }
        })
})
app.post('/comments',(req,res) => {
    // console.log(req.body)
    var item_id = req.body.item_id;
    var email = req.body.email;
    var updateStatus = 4;
    
    var sql="INSERT INTO `comments`(`item_id`) VALUES('"+item_id+"')";
     connection.query(sql,(err,result) => {
        if(err) throw err;
         if(result.affectedRows==1){
                     
                    var sql2 = "UPDATE `orders` SET `status`='"+updateStatus+"'  WHERE `item_id` = '"+req.body.item_id+"' AND `c_email`='"+email+"'";
                        connection.query(sql2,(error,result1)=>{
                            // console.log(sql2)
                            if(error) throw error;
                            if(result1.affectedRows == 1){
                                res.send({
                                    status:1,
                                    result
                                 })
                                console.log("Updated");
                            }else{
                                res.send({
                                    status:2
                                })
                            }
                        })
                 }else{
                     res.send({
                         status:2
                     })
                 }
             })
         
     })

    


app.post('/commentsUpdate',(req,res) => {
    // console.log(req.body.id)
    var name = req.body.name;
    var email = req.body.email;
    var rating = req.body.rating;
    var desc = req.body.Comments;
    var status = 1;
    
    
    var sql="UPDATE `comments` SET  `name`='"+name+"', `email`='"+email+"',`rating`='"+rating+"', `description`='"+desc+"', `status`='"+status+"' WHERE `id` = '"+req.body.id+"'";
     connection.query(sql,(err,result) => {
        //  console.log(sql)
            if(err) throw err;
         if(result.affectedRows==1){
             res.send({
                 status:1
             })
            
         }else{
             res.send({
                 status:2
             })
         }
     })

    
})

// app.get('/orderStatus',(req,res)=>{
//     var sql="SELECT * FROM `orders` WHERE `status` = '4'";
//     connection.query(sql,(err,result) => {
//         if(err) throw err;
//         if(result.length > 0){
//             res.send({
//                 status:1,
//                 result
//             })
//         }else{
//             res.send({
//                 status:0
//             })
//         }
//     })
// })

app.post('/commentsDetails',(req,res)=>{
    // console.log(req.body)
    var sql="SELECT * FROM `comments` WHERE `item_id` = '"+req.body.item_id+"'";
    connection.query(sql,(err,result) => {
        // console.log(sql)
        if(err) throw err;
        if(result.length > 0){
            res.send({
                status:1,
                result
            })
        }else{
            res.send({
                status:0
            })
        }
    })
})

app.post('/f_pwd',(req,res) =>{
    var question=req.body.question;
    var email=req.body.email;
    var pwd=req.body.password;
    var sql="UPDATE `customer` SET `pwd`='"+pwd+"' WHERE `email` = '"+email+"' AND `question`='"+question+"'";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                status:1
            })
        }else{
            res.send({
                status:0
            })
        }
    })
})

app.post('/s_f_pwd',(req,res) =>{
    var question=req.body.question;
    var email=req.body.email;
    var pwd=req.body.password;
    var sql="UPDATE `shop` SET `pwd`='"+pwd+"' WHERE `email` = '"+email+"' AND `question`='"+question+"'";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                status:1
            })
        }else{
            res.send({
                status:0
            })
        }
    })
})

app.post('/item1',(req,res)=>{
    var sql="SELECT * FROM `"+req.body.shop+"_1` WHERE `category`='"+req.body.cat+"'";
    connection.query(sql,(err,result)=>{
        // console.log(sql);
        if(err) throw err;
        if(result.length > 0){
            res.send({
                status:1,
                result
            })
        }else{
            res.send({
                status:0
            })
        }
    })
})

app.post('/item2',(req,res)=>{
    var sql="SELECT * FROM `"+req.body.shop+"_1` WHERE `item`='"+req.body.item+"' AND `category`='"+req.body.cat+"'";
    connection.query(sql,(err,result)=>{
        // console.log(sql);
        if(err) throw err;
        if(result.length > 0){
            res.send({
                status:1,
                result
            })
        }else{
            res.send({
                status:0
            })
        }
    })
})

app.post('/item3',(req,res)=>{
    var sql="SELECT * FROM `"+req.body.shop+"_1` WHERE (`size`='"+req.body.size+"' OR `size2`='"+req.body.size+"' OR `size3`='"+req.body.size+"' OR `size4`='"+req.body.size+"' OR `size5`='"+req.body.size+"' OR `size6`='"+req.body.size+"')  AND `item`='"+req.body.item+"' AND `category`='"+req.body.cat+"'";
    connection.query(sql,(err,result)=>{
        // console.log(sql)
        // console.log(result);
        if(err) throw err;
        if(result.length > 0){
            res.send({
                status:1,
                result
            })
        }else{
            res.send({
                status:0
            })
        }
    })
})

app.post('/contact',(req,res) =>{
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var query=req.body.query;
    var status = 1;
    var sql="INSERT INTO `contact`(`name`, `phone`, `email`, `query`, `status`) VALUES ('"+name+"','"+phone+"','"+email+"','"+query+"','"+status+"')";;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                status:1
            })
        }else{
            res.send({
                status:0
            })
        }
    })
})

module.exports = app;