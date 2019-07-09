 const express = require('express');
 const app = express();

 app.listen(3333, () => console.log('Listening at port 3333'));
 app.use(express.static('public'));
 app.use(express.json({limit: '1mb'}));

 app.post('/api', (req,res) => {
    console.log(req.body);
    res.json({
        status: 'success'
    });
 });