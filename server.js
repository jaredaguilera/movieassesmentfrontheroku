const express = require('express');
const app = express();

app.use(express.static(__dirname+'/dist/movieassesmentfrontheroku'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/movieassesmentfrontheroku/index.html'));
});
app.listen(process.env.PORT || 8080);
