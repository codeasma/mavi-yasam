
const CONFIG = {
  phone: "905378539036",      // country code + number, digits only (e.g. 905321234567)
  email: "",
  gaId: ""                    // Google Analytics ID like "G-XXXXXXXXXX" (leave empty to disable)
};
// ===================================
const $ = (s) => [...document.querySelectorAll(s)];

// Language switch 
function setLang(l) {
  document.documentElement.lang = l;
  try { localStorage.setItem("lang", l); } catch (e) {}
}
let saved = "tr";
try { saved = localStorage.getItem("lang") || "tr"; } catch (e) {}
setLang(saved);
$(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.l)));

// Contact links
$("#wa")[0].href = "https://wa.me/" + CONFIG.phone;
$("#tel")[0].href = "tel:+" + CONFIG.phone;
$("#mail")[0].href = "mailto:" + CONFIG.email;

// Floor plan tabs
$(".tabs button").forEach((b) => b.addEventListener("click", () => {
  $(".tabs button").forEach((x) => x.setAttribute("aria-selected", x === b));
  $("#planimg")[0].src = "img/plan-" + b.dataset.p + ".jpg";
  track("plan_view", { plan: b.dataset.p });
}));

// Lightbox
const lb = $("#lb")[0], lbImg = lb.querySelector("img");
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("zoom")) { lbImg.src = e.target.src; lbImg.alt = e.target.alt; lb.showModal(); }
  else if (e.target.closest("#lb")) lb.close();
});

// Analytics (Google Analytics 4, only loads if gaId is set)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
function track(name, params) { if (CONFIG.gaId) gtag("event", name, params || {}); }
if (CONFIG.gaId) {
  const s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.gaId;
  document.head.appendChild(s);
  gtag("js", new Date()); gtag("config", CONFIG.gaId);
}
$("[data-track]").forEach((a) => a.addEventListener("click", () => track("contact_click", { method: a.dataset.track })));
