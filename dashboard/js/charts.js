const ctx1 = document.getElementById("chart-1").getContext("2d");
const myChart = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['Registered', 'Pending'],
        datasets: [
            {
                // label: 'registeredUsers',

                data: [600, 800,],
                backgroundColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",

                ],
            },
        ],
    },
    options: {
        responsive: true,
    },
});

const ctx2 = document.getElementById("chart-2").getContext("2d");
const myChart2 = new Chart(ctx2, {
    type: "bar",
    data: {
        labels: ['Engineer', 'Designer', 'Manager', 'HR'],
        datasets: [
            {
                label: 'Applications',
                data: [30, 20, 25, 15],
                backgroundColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",

                ],
            },
        ],
    },
    options: {
        responsive: true,
    },
});




const ctx3 = document.getElementById("chart-3").getContext("2d");
const myChart3 = new Chart(ctx3, {
    type: "line",
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Applications',
            data: [10, 20, 15, 25, 30],
            borderColor: 'red',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        responsive: true,
    },
});


const ctx4 = document.getElementById("chart-4").getContext("2d");
const myChart4 = new Chart(ctx4, {
    type: "doughnut",
    data: {
        labels: ['Active Jobs', 'Inactive Jobs', 'New Jobs'],
        datasets: [{
            label: 'Quick Stats',
            data: [50, 30, 20],
            backgroundColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",

            ],
        }]
    },
    options: {
        responsive: true,
    },
});


