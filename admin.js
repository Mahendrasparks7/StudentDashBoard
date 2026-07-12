const API_URL = "https://studentdashboard-z477.onrender.com/student";


async function fetchData() {

    let res = await fetch(API_URL);

    try {
        if (!res.ok) {
            throw new Error("Data not fetching");
        }

        let data = await res.json();
        showdata(data);

    } catch (error) {
        console.log(error);
    }
}


function showdata(data) {

    let container = document.getElementById("container");
    container.innerHTML = "";

    let item = document.createElement("div");

    item.innerHTML = data.map((student) => {

        return `
        <div class="card">

            <p><strong>Id :</strong> ${student.id}</p>
            <p><strong>Name :</strong> ${student.name}</p>

            <button class="deleteBtn" id="delete${student.id}">
                Delete
            </button>

            <button class="editBtn" id="edit${student.id}">
                Edit
            </button>

        </div>
        `;

    }).join("");


    container.appendChild(item);


    data.forEach(student => {

        let deletebtn = document.getElementById(`delete${student.id}`);
        let editbtn = document.getElementById(`edit${student.id}`);


        deletebtn.onclick = () => {
            deleteData(student.id);
        };


        editbtn.onclick = () => {
            editData(student.id);
        };

    });

}



// Delete Student
async function deleteData(id) {


    let res = await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });


    try {

        if (!res.ok) {
            throw new Error("Data Not Deleted");
        }


        alert("Data Deleted Successfully");

        fetchData();


    } catch (error) {

        console.log(error);

    }

}



// Edit Student
async function editData(id) {


    let studentId = document.getElementById("id");
    let stName = document.getElementById("name");
    let image = document.getElementById("image");


    let res = await fetch(`${API_URL}/${id}`);


    try {


        if (!res.ok) {
            throw new Error("Data not getting");
        }


        let data = await res.json();


        studentId.value = data.id;
        stName.value = data.name;
        image.value = data.image;


    } catch (error) {

        console.log(error);

    }

}



// Add / Update Student
async function savedata() {


    let studentId = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;


    let obj = {

        name: name,
        image: image

    };


    let method = studentId ? "PUT" : "POST";


    let URL = studentId
        ? `${API_URL}/${studentId}`
        : API_URL;



    let res = await fetch(URL, {


        method: method,


        headers: {

            "Content-Type": "application/json"

        },


        body: JSON.stringify(obj)


    });



    try {


        if (!res.ok) {

            throw new Error("Data Not Saved");

        }


        alert(studentId 
            ? "Data Updated Successfully" 
            : "Data Added Successfully"
        );


        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("image").value = "";


        fetchData();



    } catch(error) {

        console.log(error);

    }

}
window.addEventListener("DOMContentLoaded", fetchData);