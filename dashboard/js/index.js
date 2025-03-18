document.addEventListener("DOMContentLoaded", function () {
    fetchOrders();
});

function fetchOrders() {
    fetch("https://jsonplaceholder.typicode.com/posts")  // رابط API للحصول على البيانات
        .then(response => response.json())
        .then(data => {
            const ordersTable = document.getElementById("orders-data");
            ordersTable.innerHTML = "";

            data.forEach(order => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td data-label="Jobs ID">#${order.id}</td>
                    <td data-label="Customer Name">${order.title}</td>
                    <td data-label="Jobs Date">2025-02-23</td> <!-- تاريخ افتراضي -->
                    <td data-label="Price">$${(Math.random() * 1000).toFixed(2)}</td> <!-- سعر عشوائي -->
                    <td data-label="Jobs Status">
                        <span class="status-pending">Pending</span> <!-- حالة افتراضية -->
                    </td>
                    <td data-label="Payment Method">Credit Card</td> <!-- طريقة دفع افتراضية -->
                `;

                ordersTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching orders:", error));
}