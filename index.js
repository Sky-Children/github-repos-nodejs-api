const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', async (req, res) => {
  try {
    fs.readFile("apps/index.html",(err,data)=>{
      res.send(data);

    })
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
