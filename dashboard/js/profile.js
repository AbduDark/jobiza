


// add hovered class to selected list item
let list = document.querySelectorAll(".sidebar li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));



function showTab(tabId) {
    let tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
}
document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "register.html"; // إذا لم يكن هناك مستخدم مسجل، إعادة التوجيه إلى التسجيل
        return;
    }

    document.querySelector(".profile span").textContent = `Hi, ${user.username}`;
    document.querySelector(".user-name").textContent = user.name;
    document.querySelector(".user-role").textContent = "Web Developer"; // يمكن تحديثها لاحقًا
    document.querySelector("#overview p").textContent = `Welcome, ${user.name}!`;
    document.querySelector("#overview p:nth-child(2)").innerHTML = `<strong>Full Name:</strong> ${user.name}`;
    document.querySelector("#overview p:nth-child(3)").innerHTML = `<strong>Email:</strong> ${user.email}`;

    document.querySelector("#edit-profile input[type='text']").value = user.name;
    document.querySelector("#edit-profile input[type='text']").value = user.username;
});

document.querySelector("#edit-profile button").addEventListener("click", function () {
    let newName = document.querySelector("#edit-profile input[type='text']").value;
    
    let user = JSON.parse(localStorage.getItem("user"));
    user.name = newName;
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile updated successfully!");
    location.reload(); // إعادة تحميل الصفحة لتحديث البيانات
});


//const API_URL = "https://jsonplaceholder.typicode.com/users/1"; // بيانات وهمية للمستخدم
document.addEventListener("DOMContentLoaded", async function () {
    try {
        let response = await fetch(API_URL);
        let user = await response.json();

        // حفظ البيانات في localStorage لمحاكاة تسجيل الدخول
        localStorage.setItem("user", JSON.stringify(user));

        // عرض البيانات في Overview
        document.querySelector("#overview p:nth-child(2)").innerHTML = `<strong>Full Name:</strong> ${user.name}`;
        document.querySelector("#overview p:nth-child(3)").innerHTML = `<strong>Email:</strong> ${user.email}`;
        document.querySelector("#overview p:nth-child(4)").innerHTML = `<strong>Company:</strong> ${user.company.name}`;
        document.querySelector("#overview p:nth-child(5)").innerHTML = `<strong>Job:</strong> ${user.company.bs}`;

        // عرض البيانات في Edit Profile
        document.querySelector("#edit-profile input[name='fullName']").value = user.name;
        document.querySelector("#edit-profile input[name='company']").value = user.company.name;
        document.querySelector("#edit-profile input[name='job']").value = user.company.bs;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

// عند تعديل البيانات وحفظها
document.querySelector("#edit-profile button").addEventListener("click", function () {
    let updatedName = document.querySelector("#edit-profile input[name='fullName']").value;
    let updatedCompany = document.querySelector("#edit-profile input[name='company']").value;
    let updatedJob = document.querySelector("#edit-profile input[name='job']").value;

    // تحديث البيانات في Overview فورًا
    document.querySelector("#overview p:nth-child(2)").innerHTML = `<strong>Full Name:</strong> ${updatedName}`;
    document.querySelector("#overview p:nth-child(4)").innerHTML = `<strong>Company:</strong> ${updatedCompany}`;
    document.querySelector("#overview p:nth-child(5)").innerHTML = `<strong>Job:</strong> ${updatedJob}`;

    // تحديث الـ localStorage لمحاكاة تحديث البيانات
    let user = JSON.parse(localStorage.getItem("user"));
    user.name = updatedName;
    user.company.name = updatedCompany;
    user.company.bs = updatedJob;
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile updated successfully!");
});


 // بيانات وهمية للمستخدم

document.addEventListener("DOMContentLoaded", async function () {
    try {
        let response = await fetch(API_URL);
        let user = await response.json();

        // حفظ البيانات في LocalStorage لمحاكاة تسجيل الدخول
        localStorage.setItem("user", JSON.stringify(user));

        // تحديث البيانات في Overview
        document.querySelector("#overview p:nth-child(2)").innerHTML = `<strong>Full Name:</strong> ${user.name}`;
        document.querySelector("#overview p:nth-child(3)").innerHTML = `<strong>Email:</strong> ${user.email}`;
        document.querySelector("#overview p:nth-child(4)").innerHTML = `<strong>Company:</strong> ${user.company.name}`;
        document.querySelector("#overview p:nth-child(5)").innerHTML = `<strong>Job:</strong> ${user.company.bs}`;

        // تحديث البيانات في Edit Profile
        document.querySelector("#edit-profile input[name='fullName']").value = user.name;
        document.querySelector("#edit-profile input[name='company']").value = user.company.name;
        document.querySelector("#edit-profile input[name='job']").value = user.company.bs;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

// عند تعديل البيانات وحفظها
document.querySelector("#save-profile").addEventListener("click", function () {
    let updatedName = document.querySelector("#edit-profile input[name='fullName']").value;
    let updatedCompany = document.querySelector("#edit-profile input[name='company']").value;
    let updatedJob = document.querySelector("#edit-profile input[name='job']").value;
    let updatedImage = document.getElementById("profile-pic-preview").src; // حفظ الصورة الجديدة

    // تحديث البيانات في Overview فورًا
    document.querySelector("#overview p:nth-child(2)").innerHTML = `<strong>Full Name:</strong> ${updatedName}`;
    document.querySelector("#overview p:nth-child(4)").innerHTML = `<strong>Company:</strong> ${updatedCompany}`;
    document.querySelector("#overview p:nth-child(5)").innerHTML = `<strong>Job:</strong> ${updatedJob}`;
    document.querySelector(".profile-pic").src = updatedImage;

    // تحديث LocalStorage لمحاكاة تحديث البيانات
    let user = JSON.parse(localStorage.getItem("user"));
    user.name = updatedName;
    user.company.name = updatedCompany;
    user.company.bs = updatedJob;
    user.profileImage = updatedImage;
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile updated successfully!");
});

// تحديث صورة الملف الشخصي عند اختيار صورة جديدة
document.getElementById("profile-pic-input").addEventListener("change", function (event) {
    let reader = new FileReader();
    reader.onload = function () {
        document.getElementById("profile-pic-preview").src = reader.result;
        document.querySelector(".profile-pic").src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});



document.addEventListener("DOMContentLoaded", async function () {
    try {
        let response = await fetch(API_URL);
        let user = await response.json();

        // حفظ البيانات في localStorage لمحاكاة الحساب المسجل
        localStorage.setItem("user", JSON.stringify(user));

        // تحديث البيانات في Overview
        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;
        document.getElementById("profile-company").textContent = user.company.name;
        document.getElementById("profile-job").textContent = user.company.bs;

        // تحديث البيانات في Edit Profile
        document.querySelector("#edit-profile input[name='fullName']").value = user.name;
        document.querySelector("#edit-profile input[name='company']").value = user.company.name;
        document.querySelector("#edit-profile input[name='job']").value = user.company.bs;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

// عند تعديل البيانات وحفظها
document.querySelector("#save-profile").addEventListener("click", function () {
    let updatedName = document.querySelector("#edit-profile input[name='fullName']").value;
    let updatedCompany = document.querySelector("#edit-profile input[name='company']").value;
    let updatedJob = document.querySelector("#edit-profile input[name='job']").value;

    // تحديث البيانات في Overview فورًا
    document.getElementById("profile-name").textContent = updatedName;
    document.getElementById("profile-company").textContent = updatedCompany;
    document.getElementById("profile-job").textContent = updatedJob;

    // تحديث LocalStorage لمحاكاة تحديث البيانات
    let user = JSON.parse(localStorage.getItem("user"));
    user.name = updatedName;
    user.company.name = updatedCompany;
    user.company.bs = updatedJob;
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile updated successfully!");
});



//const API_URL = "https://jsonplaceholder.typicode.com/users/1"; // API وهمي

document.addEventListener("DOMContentLoaded", async function () {
    try {
        let response = await fetch(API_URL);
        let user = await response.json();

        // حفظ البيانات في LocalStorage لمحاكاة الحساب المسجل
        localStorage.setItem("user", JSON.stringify(user));

        // تحديث Navbar
        document.getElementById("navbar-username").textContent = `Hi, ${user.name}`;

        // تحديث Sidebar
        document.getElementById("sidebar-name").textContent = user.name;
        document.getElementById("sidebar-job").textContent = user.company.bs;

        // تحديث Overview
        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;
        document.getElementById("profile-company").textContent = user.company.name;
        document.getElementById("profile-job").textContent = user.company.bs;

        // تحديث Edit Profile
        document.querySelector("#edit-profile input[name='fullName']").value = user.name;
        document.querySelector("#edit-profile input[name='company']").value = user.company.name;
        document.querySelector("#edit-profile input[name='job']").value = user.company.bs;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

// عند تعديل البيانات وحفظها
document.querySelector("#save-profile").addEventListener("click", function () {
    let updatedName = document.querySelector("#edit-profile input[name='fullName']").value;
    let updatedCompany = document.querySelector("#edit-profile input[name='company']").value;
    let updatedJob = document.querySelector("#edit-profile input[name='job']").value;
    let updatedImage = document.getElementById("profile-pic-preview").src; // حفظ الصورة الجديدة

    // تحديث Overview
    document.getElementById("profile-name").textContent = updatedName;
    document.getElementById("profile-company").textContent = updatedCompany;
    document.getElementById("profile-job").textContent = updatedJob;

    // تحديث Sidebar
    document.getElementById("sidebar-name").textContent = updatedName;
    document.getElementById("sidebar-job").textContent = updatedJob;

    // تحديث Navbar
    document.getElementById("navbar-username").textContent = `Hi, ${updatedName}`;

    // تحديث LocalStorage لمحاكاة تحديث البيانات
    let user = JSON.parse(localStorage.getItem("user"));
    user.name = updatedName;
    user.company.name = updatedCompany;
    user.company.bs = updatedJob;
    user.profileImage = updatedImage;
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile updated successfully!");
});

// تحديث صورة الملف الشخصي عند اختيار صورة جديدة
document.getElementById("profile-pic-input").addEventListener("change", function (event) {
    let reader = new FileReader();
    reader.onload = function () {
        document.getElementById("profile-pic-preview").src = reader.result;
        document.getElementById("navbar-profile-pic").src = reader.result;
        document.getElementById("sidebar-profile-pic").src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});


function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');

    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        container.style.marginLeft = "220px";
        container.style.width = "calc(100% - 220px)";
    } else {
        container.style.marginLeft = "80px";
        container.style.width = "calc(100% - 80px)";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const profileName = document.getElementById("profile-name");
    const profileCompany = document.getElementById("profile-company");
    const profileJob = document.getElementById("profile-job");
    const profileEmail = document.getElementById("profile-email");
    const profilePhone = document.getElementById("profile-phone");

    // ✅ جلب البيانات من API
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => response.json())
        .then(data => {
            profileName.textContent = data.name;
            profileCompany.textContent = data.company.name;
            profileJob.textContent = "Web Developer"; // API لا يحتوي على وظيفة، لذا قمنا بإضافة قيمة تجريبية
            profileEmail.textContent = data.email;
            profilePhone.textContent = data.phone;
        })
        .catch(error => console.error("Error fetching data:", error));
});

