async function addWorkout(){
    //get the song inforamtion
    const wkName = document.getElementById("workout-name").value;
    const wkType = document.getElementById("workout-type").value;
    const wkPart = document.getElementById("workout-part").value;
    const wkMuscles = document.getElementById("workout-muscles").value;

    console.log(`You are adding the ${wkName} exercise, which is a ${wkType} exercise that focuses on the ${wkPart} body, working the ${wkMuscles} muscles`);

    let workout = {"name": wkName, "type":wkType, "part":wkPart, "muscle-group": wkMuscles};

    let response = await fetch('/workouts/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(workout),
    });

    let result = await response.json();
    console.log("Resposne from server: " + result);
}


window.onload = function(){

    let addWkt = document.getElementById("add-btn");
    addWkt.onclick = this.addWorkout;

    let editBtn = document.getElementById("edit-btn");
    //editBtn.onclick = ;

    let deleteBtn = document.getElementById("del-btn");
    //deleteBtn.onclick = ;
}