const bcryptjs = require("bcryptjs")


const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          
          const config = bcryptjs.compareSync(password, users[i].password)
          if(password === users[i].password){
            let user2Return = {...users[i]}
            delete user2Return.pinHash
            return res.status(200).send(user2Return)
          }
          // console.log(password)
          // res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { username, email, firstName, lastName, password } = req.body
        const salt = bcryptjs.genSaltSync(5);
        let user = { username, email, firstName, lastName, password }
        users.push(user)
        let user2Return = {...user}
        delete user2Return.pinHash 
        res.status(200).send(user2Return)
        const pinHash = bcryptjs.hashSync(password, salt);
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        
    }
}