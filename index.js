const bodyParser = require('body-parser')
const db = require("./db_config")
const express = require('express')
const { read } = require('fs')
const app = express()
const port = 3000
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get('/', (req, res) => {
  res.render("pages/index",{data:null})
})
app.post("/",(req, res)=>{
    console.log(req.body)
    db.query("select * from biodata where npm=?", [parseInt(req.body.npm)], function (err, result) {
        if (err) throw err;
        console.log(result[0]);
        // res.render("pages/index",{name:result[0].name,npm:result[0].npm,gender:result[0].gender,class:result[0].class}) 
        
        res.render("pages/index",{data:result[0]})
      });
    });




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

