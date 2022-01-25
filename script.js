
let users = [];
fetch('todoJson.json')
  .then(res => res.json())
  .then(data => {
    users.push(data)
    console.log(users)
  })
  .catch(err => console.log(err.message))
