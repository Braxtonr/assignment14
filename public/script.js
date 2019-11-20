async function showWorkouts(){
    let workoutsJson = await fetch('workouts');
    let workouts = await workoutsJson.json();
    let workDiv = document.getElementById("workout");

    for(i in workouts){
        workDiv.append(getWorkElem(workouts[i]));
    }
}

function getWorkElem(workout){
    let workoutDiv = document.createElement("div");
    workoutDiv.classList.add("workout");
    let workoutTitle = document.createElement("h3");
    workoutTitle.innerHTML = workout.id + ": " + workout.name;

    let workoutP = document.createElement("p");
    workoutP.innerHTML = `${workout.type} Exercise, ${workout.part} Body, Targets ${workout.muscles}`;

    //create edit and delete links
    let editLink = document.createElement("button");
    editLink.href = "#edit-workout";
    editLink.innerHTML = "Edit";
    editLink.setAttribute("data-id", workout.id);
    editLink.onclick = showEditWorkout;
    let deleteLink = document.createElement("button");
    deleteLink.href = "#";
    deleteLink.innerHTML = "Delete";
    deleteLink.setAttribute("data-id", workout.id);
    deleteLink.onclick = deleteWorkout;
    workoutP.append(editLink);
    workoutP.append(deleteLink);

    workoutDiv.append(workoutTitle);
    workoutDiv.append(workoutP);
    
    return workoutDiv;
}

async function showEditWorkout(){
    let id = this.getAttribute("data-id");
    document.getElementById("edit-workout-id").innerHTML = id;

    let response = await fetch(`workouts/${id}`);
    let workout = await response.json();
    document.getElementById("workout-edit-name").value = workout.name;
    document.getElementById("workout-edit-type").value = workout.type;
    document.getElementById("workout-edit-part").value = workout.part;
    document.getElementById("workout-edit-muscles").value = workout.muscles;

    return false;
}

async function deleteWorkout(){
    const id = this.getAttribute("data-id");
    
    let response = await fetch(`workouts/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(workout),
    });

    if(response.status != 200){
        console.log("Error adding workout");
        return;
    }

    showWorkouts();
    return false;
}

async function addWorkout(){
    //get the workout inforamtion
    const wkName = document.getElementById("workout-name").value;
    const wkType = document.getElementById("workout-type").value;
    const wkPart = document.getElementById("workout-part").value;
    const wkMuscles = document.getElementById("workout-muscles").value;

    console.log(`You are adding the ${wkName} exercise, which is a ${wkType} exercise that focuses on the ${wkPart} body, working the ${wkMuscles} muscles`);

    let workout = {"name": wkName, "type":wkType, "part":wkPart, "muscle-group": wkMuscles};

    let response = await fetch('workouts/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(workout),
    });

    if(response.status != 200){
        console.log("Error adding workout");
        return;
    }


    let result = await response.json();
    showWorkouts();
}

async function editWorkout(){
    let id = document.getElementById("edit-workout-id").textContent;
    let name = document.getElementById("workout-edit-name").value;
    let type = document.getElementById("workout-edit-type").value;
    let part = document.getElementById("workout-edit-part").value;
    let muscles = document.getElementById("workout-edit-muscles").value;
    let workout = {"name":name, "type": type, "part": part, "muscles": muscles};

    let response = await fetch(`workouts/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(workout),
    });

    if(response.status != 200){
        console.log("Error edditing workout");
    }

    showWorkouts();
}


window.onload = function(){
    this.showWorkouts();
    
    let addWkt = document.getElementById("add-btn");
    addWkt.onclick = this.addWorkout;

    let editBtn = document.getElementById("edit-btn");
    editBtn.onclick = editWorkout;
}