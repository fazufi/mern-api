const comments= [{name: "heheheheheheheheehehheheheheh", email:"fazufi10@gmail.com", body:"semua", "id": 1}, {name: "izul", email:"izul@gmail.com", body:"izul", "id": 2}, {name: "setren", email:"setren@gmail.com", body:"setren", "id": 3}]

exports.createComments = (req, res, next)=>{  
  res.json(comments)
  next()
}

exports.getComments = (req, res, next)=>{  
  res.json(comments)
  next()
}