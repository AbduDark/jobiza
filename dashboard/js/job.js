// add hovered class to selected list item
let list = document.querySelectorAll(".sidebar li");

function activeLink() {
    list.forEach((item) => {
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));
const API_URL = "https://jsonplaceholder.typicode.com/users";
let jobs = [];
let currentPage = 1;
const itemsPerPage = 5;

// ✅ جلب البيانات من API
async function fetchJobs() {
    document.getElementById("loading").style.display = "block";
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        jobs = data.map(user => ({
            id: user.id,
            title: `Job ${user.id}`,
            company: user.name,
            applicants: Math.floor(Math.random() * 50),
            status: Math.random() > 0.5 ? 'Pending' : (Math.random() > 0.5 ? 'Accepted' : 'Rejected')
        }));

        applyFilters();
    } catch (error) {
        console.error("Error fetching jobs:", error);
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}

// ✅ عرض الوظائف في الجدول مع أيقونات تلقائية
function displayJobs(filteredJobs) {
    const jobTable = document.getElementById("jobTable");
    jobTable.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let paginatedJobs = filteredJobs.slice(start, start + itemsPerPage);

    paginatedJobs.forEach(job => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${job.id}</td>
            <td>${job.title}</td>
            <td>${job.company}</td>
            <td>${job.applicants}</td>
            <td><span class="status ${job.status.toLowerCase()}">${job.status}</span></td>
            <td>
                <button class="edit-btn" onclick="openEditJobModal(${job.id})">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteJob(${job.id})">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
 

                
            </td>
        `;
        jobTable.appendChild(row);
    });

    generatePagination(filteredJobs.length);
}

// ✅ إنشاء أزرار التنقل بين الصفحات
function generatePagination(totalItems) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    let totalPages = Math.ceil(totalItems / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.innerHTML = `<i class="fa-solid fa-circle"></i> ${i}`;
        button.onclick = () => {
            currentPage = i;
            applyFilters();
        };
        pagination.appendChild(button);
    }
}

// ✅ فلترة الوظائف
function applyFilters() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let statusFilter = document.getElementById("statusFilter").value;

    let filteredJobs = jobs.filter(job =>
        (job.title.toLowerCase().includes(searchValue) || job.company.toLowerCase().includes(searchValue)) &&
        (statusFilter === "" || job.status.toLowerCase() === statusFilter.toLowerCase())
    );

    displayJobs(filteredJobs);
}

// ✅ حذف وظيفة
// ✅ حذف وظيفة
function deleteJob(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            // تنفيذ الحذف بعد التأكيد
            jobs = jobs.filter(job => job.id !== id);
            applyFilters();

            // إظهار رسالة نجاح
            Swal.fire({
                title: "Deleted!",
                text: "Job has been deleted successfully.",
                icon: "success"
            });
        }
    });
}

// ✅ فتح نافذة إضافة وظيفة جديدة
function openAddJobModal() {
    document.getElementById("modalJobId").value = "";
    document.getElementById("modalTitle").value = "";
    document.getElementById("modalCompany").value = "";
    document.getElementById("modalApplicants").value = "";
    document.getElementById("modalStatus").value = "Pending";
    document.getElementById("modalTitleText").innerText = "Add Job";
    document.getElementById("jobModal").style.display = "flex";
}

// ✅ فتح نافذة تعديل وظيفة
function openEditJobModal(id) {
    let job = jobs.find(j => j.id === id);
    if (!job) return;

    document.getElementById("modalJobId").value = job.id;
    document.getElementById("modalTitle").value = job.title;
    document.getElementById("modalCompany").value = job.company;
    document.getElementById("modalApplicants").value = job.applicants;
    document.getElementById("modalStatus").value = job.status;
    document.getElementById("modalTitleText").innerText = "Edit Job";
    document.getElementById("jobModal").style.display = "flex";
}

// ✅ حفظ التعديلات أو إضافة وظيفة جديدة
function saveChanges() {
    let id = document.getElementById("modalJobId").value;
    let title = document.getElementById("modalTitle").value;
    let company = document.getElementById("modalCompany").value;
    let applicants = document.getElementById("modalApplicants").value;
    let status = document.getElementById("modalStatus").value;

    if (!id) {
        jobs.push({ id: jobs.length + 1, title, company, applicants: parseInt(applicants), status });
    } else {
        let job = jobs.find(j => j.id == id);
        job.title = title;
        job.company = company;
        job.applicants = parseInt(applicants);
        job.status = status;
    }

    closeModal();
    applyFilters();
}




// ✅ إغلاق النافذة
function closeModal() {
    document.getElementById("jobModal").style.display = "none";
}

// ✅ تحميل البيانات عند تشغيل الصفحة
document.addEventListener("DOMContentLoaded", fetchJobs);

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');

    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        container.style.marginLeft = "200px";
        container.style.width = "calc(100% - 200px)";
    } else {
        container.style.marginLeft = "60px";
        container.style.width = "calc(100% - 60px)";
    }
}
