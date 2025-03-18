document.addEventListener("DOMContentLoaded", async function () {
    await updateDashboard();
});

const API_URL = "https://jsonplaceholder.typicode.com/users"; // ✅ API جديد

async function updateDashboard() {
    showLoader();
    await fetchUsers();
    hideLoader();
}

async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function populateTable(users) {
    const tableBody = document.getElementById("user-table-body");
    tableBody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
                <button class="accept" onclick="acceptUser(${user.id})">Accept</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        try {
            const response = await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
            if (response.ok) {
                alert("User deleted successfully!");
                await updateDashboard();
            } else {
                alert("Error deleting user.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

function acceptUser(userId) {
    alert(`User with ID ${userId} accepted!`);
}

function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    let sidebar = document.querySelector(".sidebar");
    let navbar = document.querySelector(".navbar");
    let toggleBtn = document.querySelector(".toggle-btn");

    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");

      if (sidebar.classList.contains("open")) {
        navbar.style.marginLeft = "120px";
      } else {
        navbar.style.marginLeft = "0";
      }
    });
});



