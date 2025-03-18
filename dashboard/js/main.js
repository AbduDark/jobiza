


// start logic in header

function toggleDropdown() {
    document.querySelector(".user-profile").classList.toggle("active");
}

// ✅ إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", function (event) {
    let profile = document.querySelector(".user-profile");
    if (!profile.contains(event.target)) {
        profile.classList.remove("active");
    }
});


// Ens logic in header

// ##########################################################


// start logic sidebar

let toggle = document.querySelector(".toggle-btn");

let sidebar = document.querySelector(".sidebar");

let topBar = document.querySelector(".top-bar");
let mainPanel = document.querySelector(".main-panel");


toggle.addEventListener("click", function () {

    sidebar.classList.toggle('open');
    topBar.classList.toggle('open');

    mainPanel.classList.toggle('open');

});


// end logic sidebar


// ##########################################################
