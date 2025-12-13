const video = document.querySelector("#hero-vid");
const isMobile = window.innerWidth <= 767;

video.muted = true;
video.playsInline = true;

window.addEventListener("load", async () => {
  // 1️⃣ Wait for fonts (SplitText depends on this)
  await document.fonts.ready;

  // 2️⃣ Wait for video metadata (duration must exist)
  if (video.readyState < 1) {
    await new Promise((resolve) =>
      video.addEventListener("loadedmetadata", resolve, { once: true }),
    );
  }

  // 3️⃣ Register plugins AFTER everything is ready
  gsap.registerPlugin(SplitText, ScrollTrigger);

  /* ---------------- NAV ---------------- */
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    })
    .fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      },
    );

  /* ---------------- TEXT ---------------- */
  const heroSplit = new SplitText(".title", { type: "chars, words" });
  const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

  heroSplit.chars.forEach((el) => el.classList.add("text-gradient"));

  gsap.from(heroSplit.chars, {
    yPercent: 100,
    duration: 1.8,
    ease: "expo.out",
    stagger: 0.06,
  });

  gsap.from(paragraphSplit.lines, {
    opacity: 0,
    yPercent: 100,
    duration: 1.8,
    ease: "expo.out",
    stagger: 0.06,
    delay: 0.8,
  });

  /* ---------------- VIDEO SCRUB ---------------- */
  const startValue = isMobile ? "top 50%" : "center 60%";
  const endValue = isMobile ? "120% top" : "bottom top";

  gsap
    .timeline({
      scrollTrigger: {
        trigger: video,
        start: startValue,
        end: endValue,
        scrub: 0.3, // smoothness
        pin: true,
      },
    })
    .to(video, {
      currentTime: video.duration,
      ease: "none",
    });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
    .to(".right-leaf", { y: 200 }, 0)
    .to(".left-leaf", { y: -200 }, 0);
  const parallaxTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#cocktails",
      start: "top 30%",
      end: "bottom 80%",
      scrub: true,
    },
  });
  parallaxTl
    .from("#c-left-leaf", {
      x: -100,
      y: 100,
    })
    .from("#c-right-leaf", {
      x: 100,
      y: 100,
    });
  const abtTitleSplit = SplitText.create("#about h2", {
    type: "words",
  });
  const abtScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#about",
      start: "top center",
    },
  });
  abtScrollTl
    .from(abtTitleSplit.words, {
      opacity: 0,
      duration: 1,
      yPercent: 100,
      ease: "expo.out",
      stagger: 0.02,
    })
    .from(
      ".top-grid div, .bottom-grid div",
      {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.04,
      },
      "-=0.5",
    );
  const abtStartVal = isMobile ? "top 20%" : "top top";

  // const abtEndVal = isMobile ? 'top 20%' : 'top top';
  const maskTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#art",
      start: abtStartVal,
      end: "bottom center",
      scrub: 1.5,
      pin: true,
    },
  });
  maskTimeline
    .to(".will-fade", {
      opacity: 0,
      stagger: 0.2,
      ease: "power1.inOut",
    })
    .to(".masked-img", {
      scale: 1.3,
      maskPostition: "center",
      maskSize: "400%",
      duration: 1,
      ease: "power1.inOut",
    })
    .to("#masked-content", { opacity: 1, duration: 1, ease: "power1.inOut" });
  const footerSplit = SplitText.create("#contact h2", { type: "words" });
  const footerTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top center",
    },
    ease: "power1.inOut",
  });
  footerTl
    .from(footerSplit.words, {
      opacity: 0,
      yPercent: 100,
      stagger: 0.02,
    })
    .from("#contact h3, #contact p", {
      opacity: 0,
      yPercent: 100,
      stagger: 0.02,
    })
    .from("#f-right-leaf", {
      y: "-50",
      duration: 1,
      ease: "power1.inOut",
    })
    .from("#f-left-leaf", {
      y: "-50",
      duration: 1,
      ease: "power1.inOut",
    }, '<');
});
