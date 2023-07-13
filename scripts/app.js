window.addEventListener('load', () =>{
    if (!localStorage.getItem('user')) {
        window.alert("You must be logged in to insert and view data");
    }
});
const lastDonatedLblDom = document.getElementById('last-donated-lbl');
const donationLeftLabelDom = document.getElementById('donation-left-lbl');
const totalDonatedDom = document.getElementById('total-donated-lbl');
const quantityTextInput = document.getElementById('quantity');

// Retrieve user data from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Initialize donation history
let donationHistory = user.itemsDonated || [];
let acc = donationHistory.length + 1;

// Initialize total variables
let totalLeftToDonate = Number(user.donationsNeeded);
let totalDonations = donationHistory.reduce((total, item) => total + item.value, 0);

// Create chart
const ctx = document.getElementById('graph').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: donationHistory.map(item => item.label),
        datasets: [{
            label: "Donation Amount",
            data: donationHistory.map(item => item.value),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100,
                title: {
                    display: true,
                    text: 'Donation Amount'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Donation History'
            }
        }
    }
});

// Function to update chart with new data
const updateChart = (newData) => {
    chart.data.datasets[0].data = newData.map(item => item.value);
    chart.data.labels = newData.map(item => item.label);
    chart.update();
};

// Function to get user input
const getUserInput = (domElement) => {
    return validationUtils.sanitizeInput(domElement.value);
};

// Function to update values
const updateValues = () => {
    const quantity = Number(getUserInput(quantityTextInput));

    donationHistory.push({ label: acc, value: quantity });
    user.itemsDonated = donationHistory;
    localStorage.setItem('user', JSON.stringify(user));

    totalDonations = donationHistory.reduce((total, item) => total + item.value, 0);
    totalLeftToDonate = Number(user.donationsNeeded) - totalDonations;
    acc++;
};

// Function to update DOM elements
const updateDom = () => {
    if(totalLeftToDonate <=0){
        donationLeftLabelDom.textContent = '0';
        window.alert("You have reached your quota");
    }
    else{
        lastDonatedLblDom.textContent = donationHistory[donationHistory.length - 1].value;
        totalDonatedDom.textContent = totalDonations;
        donationLeftLabelDom.textContent = totalLeftToDonate;
    }



};

// Event listener for submit button
document.getElementById('sub-btn').addEventListener('click', (e) => {
    e.preventDefault();
    updateValues();
    updateDom();
    updateChart(donationHistory);
});