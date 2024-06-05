import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import   "dotenv/config"



const app = express()
const port = 3000
const Tokenkey = 'qswghdtyfr1@34'



app.use(express.json())
app.use(cors())


const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
});

const UserModel = mongoose.model('user', userSchema);


app.get('/user', async (req, res) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.Tokenkey);
        console.log(decoded);
        if (decoded.role === "Admin") {
            const user = await UserModel.find({})
           return  res.send(user)
        }
        res.status(401).json({ message: "You dont have permission" })

    } catch (error) {
        res.status(403).json({ message: "Token is valid" })
    }
})


// app.get('/user/:id', async (req, res) => {
//     const{id}=req.params
//     const user = await UserModel.findById(id)
//     res.send(user)
// })



app.post('/user/register', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    const user = new UserModel({ email, password })
    await user.save()
    res.send(user)

})



app.post('/user/login', async (req, res) => {

    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(401).send({ message: "Not Account" })
    }
    if (user.password !== password) {
        return res.status(404).send({ message: "password wrong" })
    }
    var token = jwt.sign({ id: user._id, email: user.email,role:user.role },Tokenkey );
    res.status(200).json({ accessToken: token })
})



app.put('/user/:id', async (req, res) => {
    const { id } = req.params
    const { email, password } = req.body
    const user = await UserModel.findByIdAndUpdate({ email, password }, id)
    res.send(user)
})


app.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findByIdAndDelete(id)
    res.send(user)
})

mongoose.connect('mongodb+srv://NiyazovAsad:Niyazovesed2004@ourdb.n1ga79r.mongodb.net/')
    .then(() => console.log("Connected"))
    .catch(() => console.log("Not Connected"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})