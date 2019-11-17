const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const workouts = [
    {id:1, name: "Bench Press", type: "Compound", part: "Upper", muscles: "Triceps and Chest" },
    {id:2, name: "Squat", type: "Compound", part: "Lower", muscles: "Quads, Hamstring, and Glutes"},
    {id:3, name: "Deadlift", type: "Compound", part: "Lower", muscles: "Glutes, Hamstring, and Back"},
    {id:4, name: "Curl", type: "Isolation", part: "Upper", muscles: "Biceps"},
    {id:5, name: "Leg Extension", type: "Isolation", part: "Lower", muscles: "Quads"},
    {id:6, name: "Dips", type: "Isolation", part: "Upper", muscles: "Triceps"}
]

app.get('/workouts', (req,res)=>{
    res.send(workouts);
});

app.get('/workouts/:id', (req, res)=>{
    const requestediD = parseInt(req.params.id);
    const workout = workouts.find(w => w.id === requestediD);

    if (!workout){
        res.status(404).send(`The workout with id ${requestediD} was not found`);

        return;
    }

    res.send(workout);
});

//render our html page
app.get('/',(req, res)=>{
    res.sendfile(__dirname + "/index.html");
});

app.post('/workouts', (req,res)=>{
    const workouts = {
        id: workouts.length + 1,
        name: req.body.name,
        type: req.body.type,
        part: req.body.part,
        muscles: req.body.muscles
    }

    workouts.push(song);
    res.send(workouts);
});

//listen
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});