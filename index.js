const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', async (req, res) => {
  try {
    fs.readFile("apps/Index.html",(err,data)=>{
      if(err!=null)
      {
        res.status(404).send(err.message);  
      }
      else  
      {
        res.send(data);
        
      }
    })
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
