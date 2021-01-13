function classToggle() {
  const navs = document.querySelectorAll(".navbar__items");

  navs.forEach((nav) => nav.classList.toggle("navbar__ToggleShow"));
}

document
  .querySelector(".navbar__link-toggle")
  .addEventListener("click", classToggle);

// INSTAGRAM FEED

window.PixleeAsyncInit = function () {
  Pixlee.init({
    apiKey: "nSVjEdFo1Y2PmhqcTigm",
  });
  Pixlee.addSimpleWidget({
    widgetId: "30880",
  });
};
