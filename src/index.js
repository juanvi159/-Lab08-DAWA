// const express = require('express');
import express from 'express'
import lista from './utils/mockup'
import MongoDB from './lib/mongo'

const app = express()
const mongo = new MongoDB()
const now = new Date()

app.get('/info', (req, res) => {
  res.send(`<h3>Phonebook has info for ${lista.length} people</h3><h3>` + now + '</h3>')
})

app.get('/api/persons', (req, res) => {
  res.send(lista)
})

app.get('/api/persons/:id', (req, res) => {
  const person = lista.find(a => a.id === parseInt(req.params.id))
  if (!person) { res.status(404).send(`No existe el registro numero ${req.params.id}.`) }
  res.send(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const borrar = lista.find(a => a.id === parseInt(req.params.id))
  if (!borrar) { res.status(404).send(`No existe el registro numero ${req.params.id}.`) }
  const index = lista.indexOf(borrar)
  lista.splice(index, 1)
  res.send(borrar)
})

app.use(express.json())
app.post('/api/persons', (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ error: 'Se requiere el nombre' })
    return
  } else if (!req.body.number) {
    res.status(400).send({ error: 'Se requiere el numero' })
    return
  }
  const nombre = lista.map((item) => { return item.name })
  if (nombre.includes(req.body.name)) {
    res.status(400).send({ error: 'El nombre ya esta en la lista' })
    return
  }

  const append = {
    name: req.body.name,
    number: req.body.number
  }
  mongo.create('lista', append)
  res.send(append)
})

app.use(function(req, res, next) {
    res.status(404).send('Juan dice que no existes!');
  });
const port = process.env.PORT || 3001;
app.listen(port,()=>console.log(`Listening on port ${port}`));