// script.js – basic interactivity for Campus Life Super App

document.addEventListener("DOMContentLoaded", () => {
  // 1) Home page: scroll to Upcoming Events when CTA is clicked
  const viewTodayEventsBtn = document.getElementById("viewTodayEventsBtn");
  const upcomingEventsSection = document.getElementById("upcomingEvents");

  if (viewTodayEventsBtn && upcomingEventsSection) {
    viewTodayEventsBtn.addEventListener("click", () => {
      upcomingEventsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 2) Events page: clicking an event shows details on the right
  const eventList = document.getElementById("eventList");
  const eventDetails = document.getElementById("eventDetails");

  if (eventList && eventDetails) {
    eventList.addEventListener("click", (event) => {
      const clicked = event.target;
      if (clicked.tagName === "LI") {
        const details = clicked.getAttribute("data-details") || clicked.textContent;
        eventDetails.textContent = details;
      }
    });
  }

  // 3) Dining page: "API" placeholder for meal plan balance
  const mealPlanBalance = document.getElementById("mealPlanBalance");

  if (mealPlanBalance) {
    async function loadMealPlanBalance() {
      try {
        // NOTE: Placeholder – this is where a real API call would go.
        mealPlanBalance.textContent = "Balance: 42 meals remaining (sample data)";
      } catch (error) {
        mealPlanBalance.textContent = "Unable to load meal plan balance yet.";
      }
    }

    loadMealPlanBalance();
  }
});
