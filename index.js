const express = require('express');

server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo Projeto",
    tasks: [],
  },
  {
    id: "2",
    title: "Novo Projeto",
    tasks: [],
  },
  {
    id: "3",
    title: "Novo Projeto",
    tasks: [],
  }
]

let reqCounter = 0;

server.use((req, res, next) => {
  reqCounter = reqCounter + 1;
  console.log(`Requisições feitas até agora ${reqCounter}`);

  return next();
});

function checkProjectExists(req, res, next) {
  if(!projects[req.params.id]) {
    return res.status(400).json({ error: 'Não existe nenhum projeto com este ID' });
  }

  return next();
}

server.post('/projects', (req, res) => {
  const newProject = req.body;

  projects.push(newProject);

  return res.json(projects);
}) 

server.get('/projects/', (req, res) => {
  return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const newTask = req.body.title;

  projects[id].tasks.push(newTask);

  return res.json(projects[id].tasks);
})

server.listen(3000);