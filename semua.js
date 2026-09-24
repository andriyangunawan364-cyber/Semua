const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const backTop = document.getElementById("backTop");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (scrollTop / max) * 100 : 0}%`;
  header.classList.toggle("scrolled", scrollTop > 20);
  backTop.style.display = scrollTop > 500 ? "grid" : "none";
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("helpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const status = document.getElementById("formStatus");
  status.textContent = `Terima kasih, ${name || "teman"}! Pesan kamu sudah disiapkan.`;
  event.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

// Efek tilt ringan pada kartu layanan desktop.
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    if (window.innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-5px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});
