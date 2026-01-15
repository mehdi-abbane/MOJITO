const loader = document.getElementById("loader");

function raf() {
  return new Promise((r) => requestAnimationFrame(r));
}

function waitForImages() {
  const imgs = [...document.images];
  return Promise.all(
    imgs.map((img) => {
      if (img.complete) return;
      return new Promise((res) => (img.onload = img.onerror = res));
    }),
  );
}

function waitForVideos() {
  const vids = [...document.querySelectorAll("video")];
  return Promise.all(
    vids.map((v) => {
      if (v.readyState >= 3) return;
      return new Promise((res) => {
        v.addEventListener("canplaythrough", res, { once: true });
        v.addEventListener("error", res, { once: true });
      });
    }),
  );
}

async function init() {
  // 🚨 force browser to paint loader FIRST
  await raf();
  await raf();

  await Promise.all([waitForImages(), waitForVideos()]);

  loader.style.transition = "opacity .4s ease";
  loader.style.opacity = "0";

  document.body.classList.remove("loading");

  setTimeout(() => loader.remove(), 400);
}

init();
