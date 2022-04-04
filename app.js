const express = require("express");
const app = express();
const db = require("./database/database");

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");

// need to use post methods
const urlencodedParser = express.urlencoded({extended: false});

app.get("/", (req, res) => {
   res.render(__dirname + "/views/startwindow.pug")
});

app.get("/main", (req,res) => {
    db.query("SELECT * FROM students", function(err, data) {
        if(err) return console.log(err);
        res.render(__dirname + "/views/index.pug", {
            title: "Nodejs coursework",
            users: data
        });
    });
});
app.post("/main", urlencodedParser, (req, res) => {
    console.log(req.body.Name, req.body.Surname);
    res.render(__dirname + "/views/index.pug");
});

app.get("/addstudent", (req, res) => {
    res.render(__dirname + "/views/addstudent.pug", {
        title: "Add student"
    })
});
app.post("/addstudent", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const age = req.body.age;
    const course_name = req.body.course_name;
    db.query("INSERT INTO students (name, age, course_name) VALUES (?,?,?)", [name, age, course_name], (err, data) => {
        if(err) return console.log(err);
        res.render(__dirname + "/views/addstudent.pug");
    });
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM students WHERE id=?", [id], (err, data) => {
        if(err) return console.log(err);
        res.render(__dirname + "/views/edit.pug", {
            user: data[0]
        });
    });
});
app.post("/edit", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const age = req.body.age;
    const id = req.body.id;
    const course_name = req.body.course_name;
    db.query("UPDATE students SET name=?, age=?, course_name=? WHERE id=?", [name, age, course_name, id], (err, data) => {
        if(err) return console.log(err);

        res.redirect("/main");
    });
});

app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM students WHERE id=?", [id], (err, data) => {
        if(err) return console.log(err);
        res.redirect("/main");
    });
});

// listen for requests
app.listen(PORT, () => {
    console.log("App is listening on port http://localhost:3000");
});