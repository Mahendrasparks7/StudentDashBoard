const API_URL = "https://studentdashboard-z477.onrender.com/student";

// Fetch Students
async function fetchData() {
    try {
        let res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Data not fetching");
        }

        let data = await res.json();
        showdata(data);

    } catch (error) {
        console.error(error);
    }
}

// Display Students
function showdata(data) {

    let container = document.getElementById("studentContainer");

    container.innerHTML = "";

    data.forEach((student) => {

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <p><strong>Id :</strong> ${student.id}</p>
            <p><strong>Name :</strong> ${student.name}</p>

            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
        `;

        card.querySelector(".deleteBtn").addEventListener("click", () => {
            deleteData(student.id);
        });

        card.querySelector(".editBtn").addEventListener("click", () => {
            editData(student.id);
        });

        container.appendChild(card);
    });
}

// Delete Student
async function deleteData(id) {

    try {

        let res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Data Not Deleted");
        }

        alert("Data Deleted Successfully");

        fetchData();

    } catch (error) {
        console.error(error);
    }
}

// Edit Student
async function editData(id) {

    try {

        let res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
            throw new Error("Data not getting");
        }

        let data = await res.json();

        document.getElementById("id").value = data.id;
        document.getElementById("name").value = data.name;
        document.getElementById("image").value = data.image;

    } catch (error) {
        console.error(error);
    }
}

// Add / Update Student
async function savedata() {

    let studentId = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;

    let obj = {
        name,
        image
    };

    let method = studentId ? "PUT" : "POST";

    let url = studentId
        ? `${API_URL}/${studentId}`
        : API_URL;

    try {

        let res = await fetch(url, {

            method: method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(obj)

        });

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

    } catch (error) {
        console.error(error);
    }
}

window.addEventListener("DOMContentLoaded", fetchData);