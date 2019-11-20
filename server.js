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

function validateWorkout(workout){
    const schema = {
        name:Joi.string().min(3).required(),
        type: Joi.string().max(5).required(),
        part: Joi.string().required(),
        muscles: Joi.string().required()
    }

    return Joi.validate(workout, schema);
}

app.post('/workouts', (req,res)=>{
    const result = validateWorkout(req.body);

    if(result.error){
        res.status(400).send(resutlt.error.details[0].message);
    }
    const workout = {
        id: workouts.length + 1,
        name: req.body.name,
        type: req.body.type,
        part: req.body.part,
        muscles: req.body.muscles
    }

    workouts.push(workout);
    res.send(workout);
});

app.put('/workouts/:id', (req,res)=>{
    const requestedId = parseInt(req.params.id);
    const workout = workouts.find(w =>w.id === requestedId);

    //no workout with matchin id in array
    if(!workout) {
        res.status(404).send(`The workout with id ${requestedId} was not found`);
        return;
    }

    //validating workout with schema
    const result = validateSong(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update
    workout.name = req.body.name;
    workout.type = req.body.type;
    workout.part = req.body.part;
    workout.muscles = req.body.muscles;
    res.send(workout);

});

app.delete('/workouts/:id',(req,res)=>{
    const requestedId = parseInt(req.params.id);
    const workout = workouts.find(w =>w.id === requestedId);

    //no workout with matchin id in array
    if(!workout) {
        res.status(404).send(`The workout with id ${requestedId} was not found`);
        return;
    }

    //workout exists so I can go forward and delete it
    let index = workouts.indexOf(workout);
    workouts.splice(index,1);
    res.send(workout);
});


//listen
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});