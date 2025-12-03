// script.js — full interactivity for Campus Life Super App

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     1) HOME: Scroll to events
  =============================== */
  const viewTodayEventsBtn = document.getElementById("viewTodayEventsBtn");
  const upcomingEventsSection = document.getElementById("upcomingEvents");

  if (viewTodayEventsBtn && upcomingEventsSection) {
    viewTodayEventsBtn.addEventListener("click", () => {
      upcomingEventsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ===============================
     2) EVENTS: Click → show details
  =============================== */
  const eventList = document.getElementById("eventList");
  const eventDetails = document.getElementById("eventDetails");

  if (eventList && eventDetails) {
    eventList.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li) return;

      const details =
        li.getAttribute("data-details") || li.textContent.trim();
      eventDetails.textContent = details;
    });
  }

  /* ===============================
     3) HOME: Search functionality
  =============================== */
  const resourceSearch = document.getElementById("resourceSearch");
  const searchResults = document.getElementById("searchResults");

  if (resourceSearch && searchResults) {
    const resources = [
      { label: "Campus Safety Seminar – Nov 16", type: "Event" },
      { label: "Basketball Game vs. Silverman – Nov 20", type: "Event" },
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
        searchResults.innerHTML =
          "<li>Start typing to search campus resources.</li>";
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

    // Initial message
    renderResults("");

    resourceSearch.addEventListener("input", (e) => {
      renderResults(e.target.value);
    });
  }

  /* ===============================
     4) DINING: Meal plan API (real external API)
  =============================== */
  const mealPlanBalance = document.getElementById("mealPlanBalance");

  if (mealPlanBalance) {
    async function loadMealPlanBalance() {
      try {
        // Uses a public sample API (dummyjson) just to simulate data.
        // This is a real external API call.
        const response = await fetch("https://dummyjson.com/carts/1");
        const data = await response.json();

        // We'll treat "totalProducts" like remaining meals
        const remaining = data.totalProducts ?? 42;
        mealPlanBalance.textContent = `Balance: ${remaining} meals remaining`;
      } catch (error) {
        console.error("Meal plan API error:", error);
        mealPlanBalance.textContent =
          "Unable to load meal plan balance right now.";
      }
    }

    loadMealPlanBalance();
  }

  /* ===============================
     5) DINING: Dietary filters
  =============================== */
  const diningItems = document.querySelectorAll(".dining-item");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const dietaryStatus = document.getElementById("dietaryStatus");

  if (diningItems.length > 0 && filterButtons.length > 0 && dietaryStatus) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");

        diningItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");
          if (category === "all" || itemCategory === category) {
            item.style.display = "list-item";
          } else {
            item.style.display = "none";
          }
        });

        if (category === "all") {
          dietaryStatus.textContent = "Showing all menu items.";
        } else {
          dietaryStatus.textContent = `Showing items that match: ${btn.textContent.trim()}.`;
        }
      });
    });
  }

  /* ===============================
     6) HOME: Real weather API (Open-Meteo)
  =============================== */
  const weatherStatus = document.getElementById("weatherStatus");

  if (weatherStatus) {
    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.98&longitude=-87.72&current_weather=true"
        );
        const data = await response.json();

        if (data && data.current_weather) {
          const tempC = data.current_weather.temperature;
          const wind = data.current_weather.windspeed;
          const tempF = Math.round((tempC * 9) / 5 + 32);
          weatherStatus.textContent = `Currently ${tempF}°F with wind at ${wind} km/h.`;
        } else {
          weatherStatus.textContent = "Weather data unavailable.";
        }
      } catch (error) {
        console.error("Weather API error:", error);
        weatherStatus.textContent = "Unable to load weather right now.";
      }
    }

    loadWeather();
  }

  /* ===============================
     7) HOME: Interactive map (Leaflet + OpenStreetMap)
  =============================== */
  const campusMapElement = document.getElementById("campusMap");

  if (campusMapElement && typeof L !== "undefined") {
    const map = L.map("campusMap").setView([41.98, -87.72], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "Map data © OpenStreetMap contributors"
    }).addTo(map);

    L.marker([41.98, -87.72])
      .addTo(map)
      .bindPopup("Campus Center Area")
      .openPopup();
  }
});
