const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
app.listen(port, console.log("¡Servidor Funcionando!"))
app.use(express.json());
app.get("/home", (req, res) => {
        res.send("Hello World Express Js GELR")
    })
    //¿Qué función cumple???
    /* app.get("/home", (req, res) => {
        res.send("Hello World Express Js Prueba GELR")
    }) */
    //Idem
app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    res.json(canciones)
})

//agregar canciones

app.post("/canciones", (req, res) => {

    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    canciones.push(cancion)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Cancion agregada con éxito!")
})

//borrar canciones

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((cancion) => cancion.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("cancion eliminada con éxito");
});

//modificar canciones

app.put("/canciones/:id", (req, res) => {

    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones[index] = cancion
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Canción modificada con éxito")

})

// devolver html

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")
})