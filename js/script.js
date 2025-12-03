document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1) HOME PAGE — Scroll to Upcoming Events
  ==========================================*/
  const viewTodayEventsBtn = document.getElementById("viewTodayEventsBtn");
  const upcomingEventsSection = document.getElementById("upcomingEvents");

  if (viewTodayEventsBtn && upcomingEventsSection) {
    viewTodayEventsBtn.addEventListener("click", () => {
      upcomingEventsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* =========================================
     2) EVENTS PAGE — Click an event → Show details
  ==========================================*/
  const eventList = document.getElementById("eventList");
  const eventDetails = document.getElementById("eventDetails");

  if (eventList && eventDetails) {
    eventList.addEventListener("click", (event) => {
      const clicked = event.target;

      if (clicked.tagName === "LI") {
        const details =
          clicked.getAttribute("data-details") || clicked.textContent;
        eventDetails.textContent = details;
      }
    });
  }

  /* =========================================
     3) HOME PAGE SEARCH — WORKING SEARCH API
  ==========================================*/
  const resourceSearch = document.getElementById("resourceSearch");
  const searchResults = document.getElementById("searchResults");

  if (resourceSearch && searchResults) {
    // Fake searchable database
    const resources = [
      { label: "Campus Safety Seminar – Nov 16", type: "Event" },
      { label: "Basketball Game – Nov 20", type: "Event" },
      { label: "Library Study Night – Nov 22", type: "Event" },
      { label: "Dining Hall – Menu & Hours", type: "Dining" },
      { label: "Campus Café – Drinks & Snacks", type: "Dining" },
      { label: "Career Services – Resume Help", type: "Service" },
      { label: "Counseling Center – Support Services", type: "Service" }
    ];

    function renderResults(query) {
      searchResults.innerHTML = "";
      const trimmed = query.trim().toLowerCase();

      if (!trimmed) {
        searchResults.innerHTML = "<li>Start typing to search resources.</li>";
        return;
      }

      const matches = resources.filter((item) =>
        item.label.toLowerCase().includes(trimmed)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = "<li>No matches found.</li>";
        return;
      }

      matches.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.label} (${item.type})`;
        searchResults.appendChild(li);
      });
    }

    resourceSearch.addEventListener("input", (e) => {
      renderResults(e.target.value);
    });

    renderResults("");
  }

  /* =========================================
     4) DINING PAGE — Fake API: Meal Plan Balance
  ==========================================*/
  const mealPlanBalance = document.getElementById("mealPlanBalance");

  if (mealPlanBalance) {
    async function loadMealPlanBalance() {
      try {
        // Simulated API call
        mealPlanBalance.textContent = "Balance: 42 meals remaining";
      } catch (error) {
        mealPlanBalance.textContent = "Unable to load meal plan balance.";
      }
    }

    loadMealPlanBalance();
  }

  /* =========================================
     5) DINING PAGE — Dietary Filter (Functional)
  ==========================================*/
  const diningItems = document.querySelectorAll(".dining-item");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (diningItems.length > 0 && filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        diningItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          if (category === "all" || itemCategory === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  /* =========================================
     6) HOME PAGE WEATHER API — Live Temperature
  ==========================================*/
  const weatherTemp = document.getElementById("weather-temp");

  if (weatherTemp) {
    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=42.0041&longitude=-87.6877&current_weather=true"
        );
        const data = await response.json();

        const temp = data.current_weather.temperature;
        weatherTemp.textContent = `${temp}°F`;
      } catch (error) {
        weatherTemp.textContent = "Weather unavailable";
      }
    }

    loadWeather();
  }
});

