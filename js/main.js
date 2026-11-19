/* ==========================================================================
   IFEOLUWA — Interaction engine
   Navigation · reveals · framework · filters · forms · progress · cursor
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- icons */
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg>';

  /* ------------------------------------------------------------ 1. NAV    */
  var NAV_ITEMS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "expertise.html", label: "Expertise", key: "expertise" },
    { href: "mindshift.html", label: "MindShift", key: "mindshift" },
    { href: "speaking.html", label: "Speaking", key: "speaking" },
    { href: "insights.html", label: "Insights", key: "insights" },
    { href: "books.html", label: "Books", key: "books" },
    { href: "contact.html", label: "Contact", key: "contact" }
  ];

  function currentPage() {
    var f = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (f === "" || f === "/") f = "index.html";
    if (f === "index.html" || f === "index") return "home";
    if (f.indexOf("case") > -1) return "insights";
    if (f.indexOf("consult") > -1) return "contact";
    if (f.indexOf("article") > -1) return "insights";
    return f.replace(".html", "");
  }

  function buildNav() {
    var host = $("#site-nav");
    if (!host) return;
    var cur = currentPage();
    var links = NAV_ITEMS.map(function (i) {
      var active = i.key === cur ? " is-active" : "";
      var aria = i.key === cur ? ' aria-current="page"' : "";
      return '<a class="nav__link' + active + '" href="' + i.href + '"' + aria + '>' + i.label + '</a>';
    }).join("");

    var drawerLinks = NAV_ITEMS.map(function (n, idx) {
      return '<li><a href="' + n.href + '"><span>' + String(idx + 1).padStart(2, "0") + '</span>' + n.label + '</a></li>';
    }).join("") + '<li><a href="consulting.html"><span>09</span>Work With Me</a></li>';

    host.outerHTML =
      '<header class="nav" id="nav">' +
        '<div class="nav__inner">' +
          '<a class="brand" href="index.html" aria-label="' + (S.wordmark || "Ifeoluwa") + ' — home">' +
            '<span class="brand__mark">' + (S.wordmark || "IFEOLUWA") + '<span>.</span></span>' +
            '<span class="brand__sub">' + (S.role || "") + '</span>' +
          '</a>' +
          '<nav class="nav__links" aria-label="Primary">' + links + '</nav>' +
          '<a class="btn btn--primary btn--sm nav__cta" href="consulting.html">Let\'s Work Together ' + ARROW + '</a>' +
          '<button class="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">' +
            '<i></i><i></i>' +
          '</button>' +
        '</div>' +
      '</header>' +
      '<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<ul class="drawer__list">' + drawerLinks + '</ul>' +
        '<div class="drawer__foot">' +
          '<a class="btn btn--primary" href="consulting.html">Let\'s Work Together ' + ARROW + '</a>' +
          '<span class="mono">' + (S.email || "") + '</span>' +
        '</div>' +
      '</div>';
  }

  function initNav() {
    var nav = $("#nav"), burger = $("#burger"), drawer = $("#drawer");
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
      var d = document.documentElement;
      var p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
      var bar = $("#progress-bar");
      if (bar) bar.style.transform = "scaleX(" + p + ")";
      var top = $(".back-top");
      if (top) top.classList.toggle("is-visible", window.scrollY > 700);
      $$(".folio__mark").forEach(function (m) {
        var r = m.getBoundingClientRect();
        var mid = window.innerHeight * 0.55;
        var pct = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
        m.style.setProperty("--p", pct.toFixed(3));
      });
    };

    var toggle = function (open) {
      nav.classList.toggle("is-open", open);
      drawer.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) { var f = drawer.querySelector("a"); if (f) f.focus(); }
    };

    burger.addEventListener("click", function () {
      toggle(!drawer.classList.contains("is-open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) { toggle(false); burger.focus(); }
    });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) toggle(false); });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------- 2. FOOTER    */
  function buildFooter() {
    var host = $("#site-footer");
    if (!host) return;
    var y = new Date().getFullYear();
    var soc = S.social || {};
    var socials = Object.keys(soc).filter(function (k) { return soc[k]; });
    var socialHtml = socials.length
      ? socials.map(function (k) {
          return '<a href="' + soc[k] + '" target="_blank" rel="noopener noreferrer" aria-label="' + k + '">' + k + '</a>';
        }).join("")
      : '<span class="dim">Social profiles — pending configuration</span>';

    host.outerHTML =
      '<footer class="foot">' +
        '<div class="shell">' +
          '<div class="foot__grid">' +
            '<div class="foot__brand">' +
              '<span class="brand__mark">' + (S.wordmark || "IFEOLUWA") + '<span>.</span></span>' +
              '<p>' + (S.statement || "") + ' — strategy, leadership education and business growth consulting for ambitious individuals and organisations.</p>' +
              '<div class="foot__social mono mt-2">' + socialHtml + '</div>' +
            '</div>' +
            '<div><h4>Navigate</h4><ul>' +
              NAV_ITEMS.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + '</a></li>'; }).join("") +
              '<li><a href="case-studies.html">Case Studies</a></li>' +
            '</ul></div>' +
            '<div><h4>Expertise</h4><ul>' +
              '<li><a href="expertise.html#growth">Business Growth Strategy</a></li>' +
              '<li><a href="expertise.html#sales">Sales &amp; Customer Acquisition</a></li>' +
              '<li><a href="expertise.html#leadership">Leadership Development</a></li>' +
              '<li><a href="expertise.html#education">Education &amp; Human Development</a></li>' +
              '<li><a href="speaking.html">Speaking &amp; Education</a></li>' +
              '<li><a href="case-studies.html">Case Studies</a></li>' +
            '</ul></div>' +
            '<div><h4>Ecosystem</h4><ul>' +
              '<li><a href="index.html#ecosystem">Grow with Ifeoluwa</a></li>' +
              '<li><a href="mindshift.html">MindShift</a></li>' +
              '<li><a href="consulting.html">Adspire Digital</a></li>' +
              '<li><a href="consulting.html">Work With Me</a></li>' +
              '<li><a href="contact.html">Contact</a></li>' +
              (S.email ? '<li><a href="mailto:' + S.email + '">' + S.email + '</a></li>' : "") +
            '</ul></div>' +
          '</div>' +
          '<p class="foot__statement">Think Strategically. Lead Intentionally. Create Lasting Value.</p>' +
          '<div class="foot__bar">' +
            '<span>&copy; <span id="year">' + y + '</span> ' + (S.name || "") + ' · All rights reserved.</span>' +
            '<span>' + (S.address || "") + '</span>' +
            '<span><a href="privacy.html">Privacy</a> · <a href="contact.html">Enquiries</a></span>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* --------------------------------------------------------- 3. REVEALS   */
  function initReveals() {
    var els = $$("[data-reveal],[data-rule],[data-stagger],.mask-reveal");
    if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------- 4. GROW FRAMEWORK        */
  function initFramework() {
    var fw = $("[data-framework]");
    if (!fw) return;
    var stages = $$(".stage", fw);
    var idx = 0, timer = null;
    var set = function (i) {
      idx = i;
      stages.forEach(function (s, n) {
        s.classList.toggle("is-active", n === i);
        s.setAttribute("aria-selected", String(n === i));
      });
      var out = $("[data-fw-output]", fw);
      if (out) {
        out.innerHTML = "<strong>" + stages[i].dataset.title + "</strong>" + stages[i].dataset.detail;
      }
      var bar = $("[data-fw-progress]", fw);
      if (bar) bar.style.transform = "scaleX(" + ((i + 1) / stages.length) + ")";
    };
    stages.forEach(function (s, n) {
      s.addEventListener("click", function () { set(n); restart(); });
      s.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { set((n + 1) % stages.length); restart(); }
        if (e.key === "ArrowLeft") { set((n - 1 + stages.length) % stages.length); restart(); }
      });
    });
    var restart = function () {
      if (reduced) return;
      clearInterval(timer);
      timer = setInterval(function () { set((idx + 1) % stages.length); }, 5200);
    };
    set(0);
    if (!reduced) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) { restart(); } else { clearInterval(timer); } });
      }, { threshold: 0.3 });
      io.observe(fw);
    }
  }

  /* --------------------------------------------------------- 5. FILTERS   */
  function initFilters() {
    $$("[data-filter-group]").forEach(function (group) {
      var targetSel = group.dataset.filterTarget || "[data-category]";
      var scope = document;
      group.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter");
        if (!btn) return;
        $$(".filter", group).forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-pressed", String(b === btn));
        });
        var val = btn.dataset.filter;
        $$(targetSel, scope).forEach(function (item) {
          var show = val === "all" || (item.dataset.category || "").split(" ").indexOf(val) > -1;
          item.classList.toggle("is-hidden", !show);
        });
        var count = $$(targetSel, scope).filter(function (i) { return !i.classList.contains("is-hidden"); }).length;
        var out = $("[data-filter-count]");
        if (out) out.textContent = count + (count === 1 ? " entry" : " entries");
      });
    });
  }

  /* --------------------------------------------------------- 6. SEARCH    */
  function initSearch() {
    var input = $("[data-search]");
    if (!input) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      $$("[data-category]").forEach(function (item) {
        var hit = !q || item.textContent.toLowerCase().indexOf(q) > -1;
        item.classList.toggle("is-hidden", !hit);
      });
    });
  }

  /* ---------------------------------------------------------- 7. FORMS    */
  function validateField(field) {
    var wrap = field.closest(".field") || field.parentElement;
    var val = (field.value || "").trim();
    var err = "";
    if (field.hasAttribute("required") && !val && field.type !== "checkbox") {
      err = "This field is required.";
    } else if (field.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
      err = "Enter a valid email address.";
    } else if (field.name === "phone" && val && !/^[+\d][\d\s().-]{6,20}$/.test(val)) {
      err = "Enter a valid phone number.";
    } else if (field.type === "checkbox" && field.hasAttribute("required") && !field.checked) {
      err = "Please confirm before continuing.";
    } else if (field.tagName === "TEXTAREA" && field.hasAttribute("required") && val.length < 20) {
      err = "Please add a little more detail (20 characters minimum).";
    }
    if (wrap && wrap.classList.contains("field")) {
      wrap.classList.toggle("has-error", !!err);
      var msg = $(".field__err", wrap);
      if (msg) msg.textContent = err;
      field.setAttribute("aria-invalid", err ? "true" : "false");
    }
    return !err;
  }

  function initForms() {
    $$("form[data-form]").forEach(function (form) {
      var status = $(".form-status", form);
      var submit = $("[type=submit]", form);

      $$("input,select,textarea", form).forEach(function (f) {
        f.addEventListener("blur", function () { if (f.value.trim()) validateField(f); });
        f.addEventListener("input", function () {
          var w = f.closest(".field");
          if (w && w.classList.contains("has-error")) validateField(f);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;
        $$("input,select,textarea", form).forEach(function (f) {
          if (f.classList.contains("hp") || f.closest(".hp")) return;
          if (!validateField(f)) ok = false;
        });
        if (!ok) {
          setStatus(status, "is-err", "Please review the highlighted fields and try again.");
          var first = $(".has-error input,.has-error select,.has-error textarea", form);
          if (first) first.focus();
          return;
        }
        var trap = $(".hp input", form);
        if (trap && trap.value) return; // honeypot: bot filled the hidden field

        var endpoint = form.dataset.endpoint || S.contactEndpoint || "";
        var payload = {};
        new FormData(form).forEach(function (v, k) { payload[k] = v; });

        setBusy(submit, true);
        setStatus(status, "is-warn", "Submitting…");

        if (!endpoint) {
          // DEMO MODE — no request is made, nothing is sent.
          window.setTimeout(function () {
            setBusy(submit, false);
            setStatus(status, "is-warn",
              "<strong>No backend connected.</strong> This enquiry has been validated but <em>not</em> sent. " +
              "Add a secure endpoint in <code>js/config.js</code> (contactEndpoint) to enable delivery, or email " +
              "<a href=\"mailto:" + (S.email || "") + "\">" + (S.email || "") + "</a> directly.");
          }, 700);
          return;
        }

        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (r) {
            setBusy(submit, false);
            if (!r.ok) throw new Error("Request failed");
            form.reset();
            setStatus(status, "is-ok", "Thank you — your enquiry has been received. You will hear back shortly.");
          })
          .catch(function () {
            setBusy(submit, false);
            setStatus(status, "is-err", "Something went wrong while sending. Please email " + (S.email || "") + " directly.");
          });
      });
    });
  }

  function setBusy(btn, busy) {
    if (!btn) return;
    if (busy) {
      btn.dataset.label = btn.innerHTML;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
      btn.setAttribute("aria-busy", "true");
    } else {
      btn.innerHTML = btn.dataset.label || btn.innerHTML;
      btn.removeAttribute("aria-busy");
    }
  }

  function setStatus(el, cls, html) {
    if (!el) return;
    el.className = "form-status is-visible " + cls;
    el.innerHTML = html;
    el.setAttribute("role", cls === "is-err" ? "alert" : "status");
  }

  /* -------------------------------------------------- 8. BACK TO TOP      */
  function initBackTop() {
    if ($("#back-top")) return;
    var b = document.createElement("button");
    b.className = "back-top";
    b.id = "back-top";
    b.setAttribute("aria-label", "Back to top");
    b.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 13V3M4 7l4-4 4 4"/></svg>';
    document.body.appendChild(b);
    b.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------- 9. READING PROGRESS        */
  function initReading() {
    var bar = $("#reading-bar");
    var article = $("[data-article]");
    if (!bar || !article) return;
    var onScroll = function () {
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var done = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      bar.style.transform = "scaleX(" + done + ")";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var links = $$(".toc a");
    if (links.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) {
            links.forEach(function (a) {
              a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id);
            });
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      $$(".prose h2[id]").forEach(function (h) { io.observe(h); });
    }
  }

  /* ---------------------------------------------------- 10. SHARE         */
  function initShare() {
    $$("[data-share]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var url = location.href;
        var title = document.title;
        if (btn.dataset.share === "copy" || navigator.share === undefined) {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(function () {
              var old = btn.textContent;
              btn.textContent = "Link copied";
              setTimeout(function () { btn.textContent = old; }, 1800);
            });
          }
        } else {
          navigator.share({ title: title, url: url }).catch(function () {});
        }
      });
    });
  }

  /* ---------------------------------------------------- 11. CURSOR        */
  function initCursor() {
    if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    var dot = document.createElement("div"); dot.className = "cursor";
    var ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    document.documentElement.classList.add("has-cursor");
    var x = 0, y = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      dot.style.transform = "translate(" + x + "px," + y + "px)";
    }, { passive: true });
    var loop = function () {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", function (e) {
      document.documentElement.classList.toggle("cursor-hot", !!e.target.closest("a,button,input,select,textarea,summary,.panel,.cell,.acard"));
    });
  }

  /* ---------------------------------------------------- 12. MISC          */
  function initMisc() {
    // Dynamic year (also present server-side as a fallback)
    var y = new Date().getFullYear();
    $$("[data-year]").forEach(function (el) { el.textContent = y; });

    // Config-driven placeholders
    $$("[data-email]").forEach(function (el) {
      if (!S.email) return;
      el.textContent = S.email;
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + S.email);
    });
    $$("[data-whatsapp]").forEach(function (el) {
      if (!S.whatsapp) { el.classList.add("is-hidden"); el.style.display = "none"; return; }
      el.setAttribute("href", "https://wa.me/" + S.whatsapp);
    });

    // Profile / brochure downloads
    $$("[data-profile-pdf]").forEach(function (el) {
      if (S.profilePdf) { el.setAttribute("href", S.profilePdf); }
      else { el.setAttribute("href", "contact.html"); el.setAttribute("title", "Professional profile PDF — pending upload"); }
    });

    // Smooth anchors (respect reduced motion)
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href*="#"]');
      if (!a) return;
      if (a.classList.contains("skip")) return; // let the skip link move focus natively
      var id = a.getAttribute("href");
      if (!id || id === "#" || id.indexOf(".html#") > -1 || id.indexOf(".html?") > -1) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });

    // Copy-link buttons inside articles
    $$("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(location.href).then(function () {
          var t = b.textContent; b.textContent = "Copied";
          setTimeout(function () { b.textContent = t; }, 1600);
        });
      });
    });
  }

  /* ---------------------------------------------------- 13. BOOT          */
  function boot() {
    buildNav();
    buildFooter();
    initNav();
    initReveals();
    initFramework();
    initFilters();
    initSearch();
    initForms();
    initBackTop();
    initReading();
    initShare();
    initCursor();
    initMisc();
    requestAnimationFrame(function () {
      document.documentElement.classList.add("is-ready");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
