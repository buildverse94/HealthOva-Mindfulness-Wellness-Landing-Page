(() => {
  "use strict";

  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  /*Sticky navbar style on scroll*/
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.querySelectorAll("a").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  /* Animated number counters */
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* Scroll reveal */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".counter").forEach(animateCounter);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* Staggered entrance for feature cards*/
  document.querySelectorAll(".feature").forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
  });

  /* Subtle parallax on hero visual */
  const visual = document.querySelector(".hero-visual");
  const canHover = window.matchMedia("(hover: hover) and (min-width: 961px)").matches;

  if (visual && canHover) {
    const layers = visual.querySelectorAll(".note-top, .bubble, .books, .hero-img");
    const depth = [14, 18, 10, 6];

    visual.addEventListener("mousemove", (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((layer, i) => {
        layer.style.transform = `translate(${x * depth[i]}px, ${y * depth[i]}px)`;
      });
    });

    visual.addEventListener("mouseleave", () => {
      layers.forEach((layer) => (layer.style.transform = ""));
    });
  }
})();
