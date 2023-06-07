const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = 8081;
app.use(express.json())
app.use(cors());





const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "crud"
    }
)

app.get("/",(req,res) =>{
    const sql = "SELECT * FROM estoque";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Erro");
        return res.json(data);
    })
})

app.post('/create',(req,res)=>{

    const sql = "INSERT INTO estoque (`nome`,`modelo`,`patrimonio`,`entrada`,`saida`,`local`) VALUES (?)";
    const values = [
        req.body.nome,
        req.body.modelo,
        req.body.patrimonio,
        req.body.entrada,
        req.body.saida,
        req.body.local

    ]
    db.query(sql, [values], (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
        
    })
})

app.put('/update/:id',(req,res)=>{

    const sql = "update estoque set `nome` = ?, `modelo` =?, `patrimonio` = ?, `entrada` = ?, `saida` = ?, `local` = ? where id = ?";
    const values = [
        req.body.nome,
        req.body.modelo,
        req.body.patrimonio,
        req.body.entrada,
        req.body.saida,
        req.body.local

    ]
    const id =req.params.id;
    db.query(sql, [...values, id], (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
        
    })
})


app.delete('/estoque/:id',(req,res)=>{

    const sql = "DELETE FROM estoque WHERE ID = ?";
    
    const id =req.params.id;
    db.query(sql, [id], (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
        
    })
})





app.listen(PORT, () =>{
    console.log("listening");
})



