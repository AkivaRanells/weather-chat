let express = require('express');
let app =express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.listen(8080);
console.log('running...');
app.get('/', function(req, res){
    res.send("working");
})

