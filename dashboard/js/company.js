// add hovered class to selected list item
let list = document.querySelectorAll(".sidebar li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));




let companies = []; // تعريف المتغير قبل الاستخدام

// ✅ جلب البيانات من API
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error(HTTP`error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            console.error('Error: Expected an array but received', data);
            return;
        }
        // ✅ تحويل البيانات لتناسب هيكل الشركة
        companies = data.map(user => ({
            id: user.id || 0,
            name: user.name || "Not Available",
            email: user.email || "Not Available",
            jobs: Math.floor(Math.random() * 10), // عدد وظائف عشوائي
            status: Math.random() > 0.5 ? 'Active' : 'Inactive' // حالة عشوائية
        }));
        displayCompanies();
    })
    .catch(error => console.error('Error fetching data:', error));

// ✅ دالة عرض البيانات في الجدول والقائمة المتجاوبة
function displayCompanies(companiesList = companies) {
    let tableBody = document.getElementById("companyTableBody");
    let companyListContainer = document.getElementById("companyList");

    tableBody.innerHTML = "";
    companyListContainer.innerHTML = "";

    companiesList.forEach(company => {
        // ✅ إضافة صف للجدول
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${company.name}</td>
            <td>${company.email}</td>
            <td>${company.jobs}</td>
            <td>${company.status}</td>
            <td>
                <button class="delete-btn" onclick="deleteCompany(${company.id})">Delete</button>
                <button class="suspend-btn" onclick="changeStatus(${company.id}, 'Inactive')">Suspend</button>
                <button class="activate-btn" onclick="changeStatus(${company.id}, 'Active')">Activate</button>
            </td>
        `;
        tableBody.appendChild(row);

        // ✅ إضافة عنصر للقائمة في الشاشات الصغيرة
        let item = document.createElement('div');
        item.classList.add('company-item');
        item.innerHTML = `
            <label>Company Name:</label><p>${company.name}</p>
            <label>Email:</label><p>${company.email}</p>
            <label>Job Count:</label><p>${company.jobs}</p>
            <label>Status:</label><p>${company.status}</p>
            <div class="actions">
                <button class="delete-btn" onclick="deleteCompany(${company.id})">Delete</button>
                <button class="suspend-btn" onclick="changeStatus(${company.id}, 'Inactive')">Suspend</button>
                <button class="activate-btn" onclick="changeStatus(${company.id}, 'Active')">Activate</button>
            </div>
        `;
        companyListContainer.appendChild(item);
    });

    updateDisplayMode();
}

// ✅ دالة فلترة الشركات
function filterCompanies() {
    let status = document.getElementById("statusFilter").value;
    let jobCount = document.getElementById("jobsFilter").value;

    let filtered = companies.filter(company => {
        return (status === "" || company.status === status) &&
            (jobCount === "" || company.jobs >= jobCount);
    });

    displayCompanies(filtered);
}

// ✅ دالة تغيير حالة الشركة
function changeStatus(id, newStatus) {
    companies = companies.map(company =>
        company.id === id ? { ...company, status: newStatus } : company
    );
    displayCompanies(companies);
}

// ✅ دالة حذف الشركة
function deleteCompany(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",  // زر الحذف باللون الأحمر
        cancelButtonColor: "#3085d6",  // زر الإلغاء باللون الأزرق
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            // تنفيذ الحذف بعد التأكيد
            companies = companies.filter(company => company.id !== id);
            displayCompanies(companies);

            // إظهار رسالة نجاح
            Swal.fire({
                title: "Deleted!",
                text: "Company has been deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6"
            });
        }
    });
}

// ✅ التبديل بين الجدول والقائمة حسب حجم الشاشة
function updateDisplayMode() {
    let table = document.querySelector("table");
    let companyListContainer = document.getElementById("companyList");

    if (window.innerWidth <= 768) {
        table.style.display = "none";
        companyListContainer.style.display = "block";
    } else {
        table.style.display = "table";
        companyListContainer.style.display = "none";
    }
}

// ✅ تحديث طريقة العرض عند تغيير حجم الشاشة
window.addEventListener("resize", updateDisplayMode);

// ✅ تحميل البيانات عند تشغيل الصفحة
window.onload = () => {
    if (companies.length > 0) {
        displayCompanies();
    }
};

// ✅ وظيفة فتح وإغلاق السايد بار
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');

    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        container.style.marginLeft = "200px";
        container.style.width = "calc(100% - 200px)";
    } else {
        container.style.marginLeft = "80px";
        container.style.width = "calc(100% - 80px)";
    }
}

// ✅ تشغيل toggleSidebar() عند تحميل الصفحة إذا كان السايد بار مفتوحًا افتراضيًا
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('.sidebar').classList.contains('open')) {
        toggleSidebar();
    }
});
