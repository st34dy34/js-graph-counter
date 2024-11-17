let plusBTN = document.querySelector("#plus");
let minusBTN = document.querySelector("#minus");
let counterText = document.querySelector("#counterText");
let resetBTN = document.querySelector("#reset");
let timestamp = document.querySelector("#timestamp");

let hourlyCounts = {};
let hour_now = 14;
let count = 0;

const post_result = () => {
  count += 1;
  updateCounter();
};

const timeStamp = () => {
  const currentHour = new Date().getHours(); // Get the current hour
  const currentMinute = new Date().getMinutes(); // Get the current minute
  const formattedTime = `${String(currentHour).padStart(2, "0")}:${String(
    currentMinute
  ).padStart(2, "0")}`; // Format in HH:MM

  if (!hourlyCounts[currentHour]) {
    hourlyCounts[currentHour] = 0;
  }
  hourlyCounts[currentHour] += 1;
  // Append the formatted time and the hourlyCounts object to the timestamp element on a new line
  timestamp.innerHTML += "<p>" + count + ": " + formattedTime + "</p>";
  console.log(hourlyCounts);
};

const increment = () => {
  count += 1;
  updateCounter();
  timeStamp();
};

const decrement = () => {
  count -= 1;
  if (count < 0) {
    count = 0;
  }
  updateCounter();
  timeStamp();
};

const resetCounter = () => {
  count = 0;
  updateCounter();
};

// Update counterText whenever count changes
const updateCounter = () => {
  counterText.innerText = count;
  const labels = [];
  const data = [];

  // Populate the chart data with the hourly counts
  for (let hour = 0; hour < 24; hour++) {
    labels.push(`${hour}:00`);
    data.push(hourlyCounts[hour] || 0); // Default to 0 if no increments for this hour
  }

  chart.data.labels = labels; // Update the x-axis labels (hours)
  chart.data.datasets[0].data = data; // Update the dataset with the counts per hour
  chart.update(); // Re-render the chart
};

plusBTN.addEventListener("click", increment);
minusBTN.addEventListener("click", decrement);
resetBTN.addEventListener("click", resetCounter);
// Set up the chart
const ctx = document.getElementById("myChart");

const chart = new Chart(ctx, {
  type: "line", // Line chart to display increments over time
  data: {
    labels: [], // Labels will be the hours (0-23)
    datasets: [
      {
        label: "Počet zákazníků",
        data: [], // The data will be populated dynamically
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          max: 12, // Set the max value to 24 for a full 24-hour cycle
          min: 21, // Set the min value to 0 (midnight)
          text: "Hour of the Day", // Title for the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Increments", // Title for the y-axis
        },
        beginAtZero: true, // Start the y-axis at 0
      },
    },
  },
});
