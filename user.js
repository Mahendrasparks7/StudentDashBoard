async function displayData() {
    let res=await fetch("http://localhost:3000/student")
    try {
        if(!res.ok){
            throw new Error("Data Not Getting");
            
        }
        let data=await res.json();
        showdata(data)
    } catch (error) {
        console.log(error)
    }
}
let container=document.getElementById("container")
function showdata(data){
    data.forEach(ele => {
        let item=document.createElement("div")
        item.innerHTML=`
        <div class="card">
            <img src="${ele.image}">
            <p><strong>Name :</strong> ${ele.name}</p>
        </div>
        `
        container.appendChild(item)
    });
}
addEventListener("DOMContentLoaded", displayData)