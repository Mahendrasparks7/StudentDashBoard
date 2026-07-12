async function displayData() {
    try {
        let res = await fetch("https://studentdashboard-z477.onrender.com/student");

        if (!res.ok) {
            throw new Error("Data Not Getting");
        }

        let data = await res.json();
        showdata(data);

    } catch (error) {
        console.log(error);
    }
}

let container = document.getElementById("container");

function showdata(data) {
    container.innerHTML = "";

    data.forEach(ele => {

        let item = document.createElement("div");

        item.innerHTML = `
            <div class="card">
                <img src="${ele.image}" alt="${ele.name}">
                <p><strong>Name :</strong> ${ele.name}</p>
            </div>
        `;

        container.appendChild(item);
    });
}

window.addEventListener("DOMContentLoaded", displayData);