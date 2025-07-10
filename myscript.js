window.addEventListener("load", () => {
  alert("Welcome to our appointment calendar");
});

const form = document.getElementById("appointmentForm");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const serviceSel = document.getElementById("service");
const list = document.getElementById("appointments");
const filterInput = document.getElementById("filter");
const modal = document.getElementById("modal");
const modalInfo = document.getElementById("modalinfo");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

// 
[nameInput, dateInput, timeInput, serviceSel].forEach(el => {
  el.addEventListener("focus", () => el.style.border = "2px solid #007bff");
  el.addEventListener("blur", () => el.style.border = "2px solid #ccc");
});

// 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addAppointment();
});

function addAppointment() {
  const name = nameInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  const service = serviceSel.value;

  if (!name || !date || !time || !service) {
    alert("Please fill in all fields");
    return;
  }

  const li = document.createElement("li");
  li.dataset.date = date;
  li.dataset.time = time;
  li.innerHTML = `
    ${name} - ${new Date(date).toLocaleDateString()} - ${time} - ${service}
    <button class="detailBtn">Details</button>
  `;

  // 
  const detailBtn = li.querySelector(".detailBtn");
  detailBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(li);
  });

  // 
  li.addEventListener("dblclick", () => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      li.remove();
    }
  });

  
  // li.addEventListener("contextmenu", (e) => {
    //e.preventDefault();
    //alert("Right-click is disabled");
  //});

  list.appendChild(li);
  form.reset();
}

// 
filterInput.addEventListener("input", () => {
  const filterValue = filterInput.value.toLowerCase();
  const items = list.querySelectorAll("li");

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filterValue) ? "" : "none";
  });
});

// 
function openModal(li) {
  const name = li.textContent.split("-")[0].trim();
  const date = li.dataset.date;
  const time = li.dataset.time;
  const service = li.textContent.split("-")[3].trim();

  modalInfo.textContent = `Appointment Information:
Name: ${name}
Date: ${new Date(date).toLocaleDateString()}
Time: ${time}
Service: ${service}`;
  modal.classList.remove("hidden");
}

// 
confirmBtn.addEventListener('click', () => {
  const items = list.children;
  for (let li of items) {
    if (!li.classList.contains('green') && modalInfo.textContent.includes(li.textContent.split(' - ')[0].trim())) {
      li.classList.add('green');
      break;
    }
  }
  modal.classList.add("hidden");
});

// 
cancelBtn.addEventListener("click", () => {
  const items = list.children;
  for (let li of items) {
    const liName = li.textContent.split(" - ")[0].trim();
    const modalName = modalInfo.textContent.split('\n')[1].split(":")[1].trim();

    if (liName === modalName) {
      li.remove();
      break; 
    }
  }

  modal.classList.add("hidden"); 
});


