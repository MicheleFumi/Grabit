const connection = require("../db/connection")


function index(req, res) {
    const query = `SELECT * FROM products`
    connection.query(query, (err, results) => {
        if (err) {
            return res.serverStatus(500).json({ err })
        }
        res.serverStatus(200).json(res)
    })
}

const addProduct = (req, res) => {
    const { name, description, price } = req.body
    if (!name || !description || !price) {
        return res.status(400).json({ message: 'all fields are mandatory!' })
    }

    const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)'

    connection.query(query, [name, description, price], (err, results) => {
        if (err) {
            return err.status(500).json({ err })
        }
        res.status(201).json({ message: 'added successfully!' })
    })
}




module.exports = { index, addProduct }