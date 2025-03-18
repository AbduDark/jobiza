
// add hovered class to selected list item
let list = document.querySelectorAll(".sidebar li");

function activeLink() {
    list.forEach((item) => {
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));



const API_URL = "https://reqres.in/api/users"; // API تجريبي من Reqres

document.addEventListener("DOMContentLoaded", async function () {
    await updateDashboard();
    toggleView(); // تحديث العرض بناءً على حجم الشاشة عند تحميل الصفحة
    setInterval(updateDashboard, 30000); // تحديث العدد كل 30 ثانية
});

// ✅ وظيفة فتح وإغلاق السايد بار
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');

    if (!sidebar || !container) {
        console.error("Error: Sidebar or container not found in the document.");
        return;
    }

    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        container.style.marginLeft = "220px";
        container.style.width = "calc(100% - 220px)";
    } else {
        container.style.marginLeft = "80px";
        container.style.width = "calc(100% - 80px)";
    }

    // console.log("Sidebar toggled:", sidebar.classList.contains('open')); // ✅ طباعة حالة السايدبار في الكونسول
}

// ✅ تحديث الـ Dashboard بالكامل
async function updateDashboard() {
    showLoader();
    await Promise.all([fetchUsers(), fetchUserCount()]);
    hideLoader();
}

// ✅ جلب المستخدمين
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        populateTable(data.data);
        populateCards(data.data);
        toggleView(); // تحديث العرض بناءً على حجم الشاشة
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// ✅ تحديث عدد المستخدمين
async function fetchUserCount() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        document.getElementById("user-count").innerText = data.data.length;
    } catch (error) {
        console.error("Error fetching user count:", error);
    }
}

// ✅ تعبئة الجدول بالبيانات
function populateTable(users) {
    const tableBody = document.getElementById("user-table-body");
    tableBody.innerHTML = ""; // تفريغ الجدول

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name} ${user.last_name}</td>
            <td>${user.email}</td>
            <td>
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ✅ تعبئة الكروت بالبيانات عند الشاشات الصغيرة
function populateCards(users) {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = ""; // تفريغ الحاوية قبل إعادة التعبئة

    users.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${user.first_name} ${user.last_name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <div class="card-buttons">
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
}

// ✅ تبديل العرض بين الجدول والكروت عند الشاشات الصغيرة
function toggleView() {
    const tableContainer = document.querySelector(".table-container");
    const cardsContainer = document.querySelector(".cards-container");

    if (!tableContainer || !cardsContainer) {
        console.error("Error: Table or cards container not found in the document.");
        return;
    }

    if (window.innerWidth <= 768) {
        tableContainer.style.display = "none";
        cardsContainer.style.display = "flex";
    } else {
        tableContainer.style.display = "block";
        cardsContainer.style.display = "none";
    }
}

// ✅ تشغيل toggleView() عند تغيير حجم الشاشة
window.addEventListener("resize", toggleView);

// ✅ حذف مستخدم

async function deleteUser(userId) {
    console.log("User ID:", userId); // تحقق من قيمة userId
    
    if (!userId || isNaN(userId)) {
        console.error("Invalid user ID:", userId);
        Swal.fire({
            title: "Error!",
            text: "Invalid user ID.",
            icon: "error"
        });
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL}` / `${userId}`, { method: "DELETE" });
                if (response.ok) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User deleted successfully!",
                        icon: "success"
                    });
                    await updateDashboard();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Error deleting user.",
                        icon: "error"
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred while deleting the user.",
                    icon: "error"
                });
            }
        }
    });
}
          
// ✅ تعديل مستخدم
async function editUser(userId) {
    const { value: newName } = await Swal.fire({
        title: "Edit User",
        input: "text",
        inputLabel: "Enter new job title:",
        inputValue: "",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#356899",  // لون الزر الأخضر (يمكنك تغييره)
        cancelButtonColor: "#d33", 
        inputValidator: (value) => {
            if (!value || value.trim() === "") {
                return "Invalid job title!";
            }
        }
    });

    if (newName) {
        try {
           const response = await fetch(`${API_URL}` / `${userId}`,  {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName.trim() })
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "User updated successfully!",
                    icon: "success"
                });
                await updateDashboard();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Error updating user.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while updating the user.",
                icon: "error"
            });
        }
    }
}
// ✅ فلترة البحث في الجدول والكروت
function searchUsers() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("tbody tr");
    let cards = document.querySelectorAll(".cards-container .card");

    rows.forEach(row => {
        let name = row.cells[1].textContent.toLowerCase();
        let email = row.cells[2].textContent.toLowerCase();
        row.style.display = (name.includes(input) || email.includes(input)) ? "" : "none";
    });

    cards.forEach(card => {
        let name = card.querySelector("h3").textContent.toLowerCase();
        let email = card.querySelector("p").textContent.toLowerCase();
        card.style.display = (name.includes(input) || email.includes(input)) ? "" : "none";
    });
}

// ✅ عرض اللودر
function showLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "block";
    }
}

// ✅ إخفاء اللودر
function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
}
