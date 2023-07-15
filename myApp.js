/** @format */

require("dotenv").config();
let express = require("express");
let app = express();
let bodyParser = require("body-parser");

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
});

app.post("/name", (req, res) => {
	var string = req.body.first + " " + req.body.last;
	res.json({ name: string });
});

app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.send({
			time: req.time,
		});
	}
);

app.get("/:word/echo", (req, res) => {
	res.json({
		echo: req.params.word,
	});
});

app.route("/name")
	.post((req, res) => {
		let firsname = req.query.first;
		let lastname = req.query.last;
		res.json({
			name: firsname + " " + lastname,
		});
	})
	.get((req, res) => {
		let firsname = req.query.first;
		let lastname = req.query.last;
		res.json({
			name: firsname + " " + lastname,
		});
	});

app.get("/", function (req, res) {
	res.sendFile((absolutePath = __dirname + "/views/index.html"));
});

app.get("/", function (req, res) {
	res.sendFile((absolutePath = __dirname + "/views/index.html"));
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (req, res) {
	if (process.env.MESSAGE_STYLE == "uppercase") {
		res.json({
			message: "Hello json".toUpperCase(),
		});
	} else {
		res.json({
			message: "Hello json",
		});
	}
});

module.exports = app;
