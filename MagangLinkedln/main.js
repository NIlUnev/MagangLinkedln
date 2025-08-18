const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("show");
});

document.querySelectorAll(".nav a").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const links = [...document.querySelectorAll(".nav-link")];
const progress = document.querySelector(".progress span");
const sections = ["home", "classes", "about", "contact"].map((id) =>
  document.getElementById(id)
);

function onScroll() {
  const scrolled = window.scrollY;
  const height = document.body.scrollHeight - innerHeight;
  progress.style.width = `${(scrolled / height) * 100}%`;

  let current = "home";
  sections.forEach((sec) => {
    if (!sec) return;
    if (scrolled + 120 >= sec.offsetTop) current = sec.id;
  });
  links.forEach((l) =>
    l.classList.toggle("is-active", l.getAttribute("href") === `#${current}`)
  );
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-shown");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

const testi = document.querySelector(".testi");
if (testi) {
  const slides = [...testi.querySelectorAll(".slide")];
  const dotsWrap = testi.querySelector(".dots");
  let idx = 0,
    timer;
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.addEventListener("click", () => show(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];

  function show(i, stop = false) {
    slides[idx].classList.remove("is-active");
    dots[idx].classList.remove("is-active");
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add("is-active");
    dots[idx].classList.add("is-active");
    if (stop) autoplay(false);
  }

  function autoplay(start = true) {
    clearInterval(timer);
    if (start && testi.dataset.autoplay) {
      timer = setInterval(() => show(idx + 1), 3500);
    }
  }

  show(0);
  autoplay(true);
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    }
  });
});
