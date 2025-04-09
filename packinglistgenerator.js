const API_KEY = "7b82557b831a1b562b632cdd64bb885f";

document.getElementById("packing-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var destination = document.getElementById("destination").value.trim();
    var duration = parseInt(document.getElementById("duration").value);

    if (destination === "") {
        alert("Please enter a destination!");
        return;
    }

    fetchWeather(destination, duration);
});

function fetchWeather(city, duration) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found. Please enter a valid city name.");
                return;
            }

            let temp = data.main.temp;
            let condition = data.weather[0].main.toLowerCase();
            let cityName = data.name;

            document.getElementById("city-name").textContent = cityName;
            document.getElementById("weather-info").innerHTML =
                `<i class="fas fa-thermometer-half"></i> Temperature: ${temp}°C, <i class="fas fa-cloud"></i> Condition: ${condition}`;

            generatePackingList(temp, condition, duration);
        })
        .catch(error => console.log("Error fetching weather:", error));
}

function generatePackingList(temp, condition, duration) {
    const packingList = document.getElementById("packing-list");
    packingList.innerHTML = "";

    const baseItems = [];

    const electronics = ["📱 Phone","🔌 Phone Charger", "🔋 Power Bank","📷 Camera","🎧 Headphones","💻 Laptop"];
    const skinCare = ["🧴Moisturizer","💄 Lip Balm","🧴 Body Lotion","🧴 Other Skin Care Products"];
    const hairCare = ["🪮 Comb","📏 Brush","🧴 Hair Oil"]
    const footWear = ["👟 Shoes","🩴 Slippers","🧦 Socks"];
    const accessories = ["👜 Purse","⌚️ Watch","👔 Neck Tie & Cuffs (is required)"];
    const travelDocs = ["💵 Cash","💳 Credit Cards","🆔 Identity Card","🛂 Passport", "📄 Visa (if required)", "🗺️ Travel Itinerary"];
    const toiletries = ["🪥 Toothbrush","🧼 Soap", "🧴 Shampoo","🗞️ Towel", "🪒 Razor", "🧻 Tissues"];
    const firstAid = ["💊 Medications","🩹 Band-Aids", "💊 Painkillers", "🧴 Antiseptic Cream", "😷 Face Masks"];
    const misc = ["🥨 Snacks","🥤 Water Bottle","📱 SIM Card",  "📚 Book", "🎲 Travel Games"];

    if (temp >= 25) {
        baseItems.push("🕶️ Sunglasses", "🧴 Sunscreen", "👕 Light Clothing");
    } else if (temp >= 15 && temp < 25) {
        baseItems.push("👚 Medium Clothing", "🧴 Sunscreen");
    } else {
        baseItems.push("🧥 Jacket", "🧤 Gloves", "🧣 Scarf");
    }

    if (condition.includes("rain")) {
        baseItems.push("☔ Umbrella", "🧥 Raincoat", "🥾 Waterproof Shoes");
    }

    // Append general items
    baseItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        packingList.appendChild(li);
    });

    // Create collapsible sections
    createExpandableSection("🛂 Travel Documents", travelDocs, packingList);
    createExpandableSection("🖥️ Electronics", electronics, packingList);
    createExpandableSection("🧴 Toiletries", toiletries, packingList);
    createExpandableSection("🧴 Skin Care Products", skinCare, packingList);
    createExpandableSection("🧴 Hair Care Products", hairCare, packingList);
    createExpandableSection("👟 Foot Wear", footWear, packingList);
    createExpandableSection("📿 Accessories", accessories, packingList);
    createExpandableSection("🩺 First Aid Kit", firstAid, packingList);
    createExpandableSection("🎒 Miscellaneous Items", misc, packingList);
}

// Utility function to create collapsible sections
function createExpandableSection(title, items, container) {
    const wrapper = document.createElement("li");
    wrapper.classList.add("collapsible");

    const header = document.createElement("div");
    header.className = "collapsible-header";
    header.textContent = title;

    const content = document.createElement("ul");
    content.className = "collapsible-content";
    content.style.display = "none";

    items.forEach(subItem => {
        const li = document.createElement("li");
        li.textContent = subItem;
        content.appendChild(li);
    });

    header.addEventListener("click", () => {
        content.style.display = content.style.display === "none" ? "block" : "none";
    });

    wrapper.appendChild(header);
    wrapper.appendChild(content);
    container.appendChild(wrapper);
}
