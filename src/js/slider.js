import { sliderLists } from "./constants.mjs";

let currentIndex = 0;

const slider = document.querySelector(".cocktail-tabs");
const arrows = document.querySelectorAll(".arrows button");
const currentPrvImg = document.querySelector("#current-cocktail");
const recipe = document.querySelector(".recipe");

/* ---------- HELPERS ---------- */
function getCocktailAt(offset = 0) {
  const index =
    (currentIndex + offset + sliderLists.length) % sliderLists.length;
  return sliderLists[index];
}

/* ---------- RENDER TABS ---------- */
function renderTabs() {
  slider.innerHTML = sliderLists
    .map((el, i) => {
      const isActive = i === currentIndex;

      return `
        <button
          class="slider-btn ${
            isActive
              ? "is-active text-white border-white"
              : "text-white/50 border-white/50"
          }"
          data-index="${i}"
        >
          ${el.name}
        </button>
      `;
    })
    .join("");
}

/* ---------- RENDER ARROWS ---------- */
function renderArrows() {
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  arrows.forEach((btn) => {
    const isLeft = btn.dataset.type === "left";
    btn.querySelector("span").innerText = isLeft
      ? prevCocktail.name
      : nextCocktail.name;
  });
}

/* ---------- RENDER CONTENT ---------- */
function renderContent() {
  const cocktail = getCocktailAt(0);

  currentPrvImg.src = cocktail.image;

  recipe.querySelector("#title").innerText = cocktail.name;
  recipe.querySelector(".details p").innerText = cocktail.description;
  recipe.querySelector(".details h2").innerText = cocktail.title;
}

/* ---------- NAVIGATION ---------- */
function goToSlide(index) {
  currentIndex = (index + sliderLists.length) % sliderLists.length;

  renderTabs();
  renderArrows();
  renderContent();
  gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
  gsap.fromTo(
    "#current-cocktail",
    { opaicity: 0, xPercent: -100 },
    { xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" },
  );
  gsap.fromTo(
    ".details h2",
    { yPercent: 100, opacity: 0 },
    { yPercent: 0, opacity: 1, ease: "power1.inOut" },
  );
  gsap.fromTo(
    ".details p",
    { yPercent: 100, opacity: 0 },
    { yPercent: 0, opacity: 1, ease: "power1.inOut" },
  );
}

/* ---------- EVENTS ---------- */
slider.addEventListener("click", (e) => {
  const btn = e.target.closest(".slider-btn");
  if (!btn) return;
  goToSlide(Number(btn.dataset.index));
});

arrows.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (btn.dataset.type === "left") {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  });
});

/* ---------- INIT ---------- */
goToSlide(0);
