const express = require('express');
//const ejs = require('ejs');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
app.use(express.static("public"));

var task=["buy socks", "Football", "Study Time"]
var complete = ['fish jquery']

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// app.get('/', (req, res)=>{
//     res.render('index');
// })
app.post('/addtask', (req, res)=>{
    let newtask = req.body.newtask; 
    task.push(newtask)
    res.redirect("/")
});

app.post('/removetask', (req, res)=>{
    const completetask = req.body.check;
    if(typeof completetask == "string"){        
        complete.push(completetask);
        task.splice(task.indexOf(completetask),1)
    }
    else if(typeof completetask == "object"){
        for(var i = 0; i<completetask.length; i++){
            complete.push(completetask[i]);
            task.splice(task.indexOf(completetask[i]),1);
        }
    }
    res.redirect('/ ')
})

app.get('/', (req, res)=>{
    res.render("index",{task : task, complete : complete});
});

app.listen(port,()=>{
    console.log(`Server is started on the port = ${port}`)
})
