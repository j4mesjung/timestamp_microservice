var express = require('express');
var app = express();

app.get('/:date', function(req,res){
  
  var date;
  var natDate = 0;
  var unixDate = 0;
  
  if(isNaN(parseInt(req.params.date))){
      date = req.params.date;
      natDate = 1;
  } else {
      date = parseInt(req.params.date);
      unixDate = 1;
  }
  
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  
  //check if parameter is a valid timestamp
  var isValidDate = (new Date(date)).getTime() > 0
  
  if(isValidDate){
      
      if(natDate){
        res.json({
          "natural": date,
          "unix": Date.parse(date) / 1000
        })
      }
      else if(unixDate){
        
        var fullDate = new Date(date*1000);
        
        var month = monthNames[fullDate.getMonth()];
        var day = fullDate.getDate();
        var year = fullDate.getFullYear();
        
        res.json({
          "natural": month+" "+day+", "+year,
          "unix": date
        });
      }
      else {
        res.send('this is not a valid timestamp')
      }
  }

  
})

console.log("Server Started on port: " + process.env.PORT);
app.listen(process.env.PORT);
