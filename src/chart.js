import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

let assignments = ["Assignment 1", "Assignment 2", "Assignment 3"];
let assignmentCounts = [5, 3, 8];
let assignmentChart = null; // Store chart instance

// Function to generate a random color
function getRandomColor() {
  return `rgba(${Math.floor(Math.random() * 255)}, 
               ${Math.floor(Math.random() * 255)}, 
               ${Math.floor(Math.random() * 255)}, 0.7)`;
}

// Function to update the chart with fresh colors
function updateChart() {
  let ctx = document.getElementById("assignmentChart").getContext("2d");

  // Destroy previous chart instance if it exists
  if (assignmentChart) {
      assignmentChart.destroy();
  }

  let colors = assignments.map(() => getRandomColor()); // Generate different colors each time

  assignmentChart = new ChartJS(ctx, {
      type: "bar",
      data: {
          labels: assignments,
          datasets: [{
              label: "Assignments Created",
              data: assignmentCounts,
              backgroundColor: colors, // Assign different colors dynamically
              borderColor: colors.map(color => color.replace("0.7", "1")), // Adjust border color
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

// Function to add a new assignment dynamically
function addAssignment() {
  let assignmentName = document.getElementById("assignmentInput").value;
  if (assignmentName.trim() !== "") {
      assignments.push(assignmentName);
      assignmentCounts.push(Math.floor(Math.random() * 10) + 1); // Random count for demo
      updateChart(); // Refresh chart with new colors
  }
}

// Call updateChart on page load
window.onload = updateChart;
