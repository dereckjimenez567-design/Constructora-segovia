/* ===================================================================
   CONSTRUCTORA SEGOVIA — Interacciones
=================================================================== */
(function () {
  "use strict";

  /* ---- Año dinámico en el footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Menú móvil ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Cerrar al hacer clic en un enlace
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Animaciones de aparición al hacer scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".service-card, .gallery-item, .about-text, .about-media, .contact-card, .contact-form, .section-head"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- Lightbox de galería ---- */
  var galleryLinks = Array.prototype.slice.call(
    document.querySelectorAll(".gallery-item")
  );
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var current = 0;

  function openLightbox(i) {
    current = i;
    var link = galleryLinks[current];
    lbImg.src = link.getAttribute("href");
    lbImg.alt = link.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(dir) {
    current = (current + dir + galleryLinks.length) % galleryLinks.length;
    openLightbox(current);
  }

  galleryLinks.forEach(function (link, i) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox(i);
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", function () { step(-1); });
  if (lbNext) lbNext.addEventListener("click", function () { step(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ---- Formulario → WhatsApp ---- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = (form.nombre.value || "").trim();
      var telefono = (form.telefono.value || "").trim();
      var email = (form.email.value || "").trim();
      var servicio = (form.servicio.value || "").trim();
      var mensaje = (form.mensaje.value || "").trim();

      var texto =
        "*Solicitud de presupuesto — Constructora Segovia*%0A%0A" +
        "*Nombre:* " + encodeURIComponent(nombre) + "%0A" +
        (telefono ? "*Teléfono:* " + encodeURIComponent(telefono) + "%0A" : "") +
        (email ? "*Correo:* " + encodeURIComponent(email) + "%0A" : "") +
        (servicio ? "*Servicio:* " + encodeURIComponent(servicio) + "%0A" : "") +
        "%0A*Detalle:*%0A" + encodeURIComponent(mensaje);

      // Número principal (David Araya Salas)
      var whatsapp = "https://wa.me/50687910539?text=" + texto;
      window.open(whatsapp, "_blank");
    });
  }
})();
