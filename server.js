const express = require('express');
const app = express();

app.use(express.static(__dirname+'/dist/projectsWallmart'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/projectsWallmart/index.html'));
});
app.listen(process.env.PORT || 8080);