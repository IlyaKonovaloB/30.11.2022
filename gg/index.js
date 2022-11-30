const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const server = http.createServer(app);
const port = 3000;
const jsonfile = require('jsonfile');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

let data = require('./data.json');
app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Вы сломали сервер!");
});

app.use((err, req, res, next) => {
	if (error instanceof ForbiddenError) {
		return res.status(403).send({
			status: "forbidden",
			message: error.message,
		});
	}
});
app.get('/book',(req, res) => {
	return res.status(200).json(data)
});
app.get('/book/:id',(req, res) => {
	let id = req.params.id;
	return res.status(200).json(data[id])
});
app.post('/book', (req, res) => {
	if (!req.body) return res.sendStatus(400)
	const user = {
	  id: data.length,
	  name: req.body.name,
	  client: req.body.client,
	  data: req.body.data,
	  data_back: req.body.data_back,
	  year: req.body.year,
	  teg:[]
	}
	jsonfile.readFile('data.json', (err, obj) => {
	  if (err) throw err
	  let fileObj = obj;
	  fileObj.push(user);
	  jsonfile.writeFile('data.json', fileObj, (err) => {
		if (err) throw err;
	  })
	  res.send(obj)
	})
  })
  app.post('/book/:id/teg', (req, res) => {
	let id =req.params.id
	if (!req.body) return res.sendStatus(400)
	const user = {
	  id: data.length,
	  name: req.body.name,
	  client: req.body.client,
	  data: req.body.data,
	  data_back: req.body.data_back,
	  year: req.body.year,
	  teg:[]
	}
	jsonfile.readFile('data.json', (err, obj) => {
	  if (err) throw err
	  let fileObj = obj;
	  fileObj.push(user);
	  jsonfile.writeFile('data.json', fileObj, (err) => {
		if (err) throw err;
	  })
	  res.send(obj)
	})
  })
  app.put('/book/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
	var client = req.body.client;
	var data = req.body.data;
	var data_back = req.body.data_back;
	var year = req.body.year;
    jsonfile.readFile('data.json', function(err, obj) {
      var fileObj = obj;
      fileObj[id].name = name;
	  fileObj[id].client = client;
	  fileObj[id].data = data;
	  fileObj[id].data_back = data_back;
	  fileObj[id].year = year;
      jsonfile.writeFile('data.json', fileObj, function(err) {
          if (err) throw err;
      });
    });
	res.json('ok')
});
  app.delete('/book/:id', (req, res) => {
	jsonfile.readFile('data.json', (err, obj) => {
	  if (err) throw err
	  let fileObj = obj;
	  for(let i = 0; i < fileObj.length; i++) {
		if (fileObj[i].id == req.params.id) {
		  fileObj.splice(i, 1)
		}
	  }
	  jsonfile.writeFile('data.json', fileObj, { spaces: 2 }, (err) => {
		if (err) throw err;
	  })
	  res.send(obj)
	})
  })
app.set('view engine', 'pug')

server.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});