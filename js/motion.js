/* KVM NATIVE MOTION SYSTEM V4
   Efeitos variados com IntersectionObserver e Web Animations API.
   Sem dependência de GSAP, ScrollTrigger ou Lenis. */
      (() => {
        "use strict";

        const root = document.documentElement;
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const finePointer = window.matchMedia(
          "(hover: hover) and (pointer: fine)",
        ).matches;
        const desktop = window.matchMedia("(min-width: 981px)").matches;
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;
        const constrainedDevice = Boolean(
          connection?.saveData ||
          (navigator.hardwareConcurrency &&
            navigator.hardwareConcurrency <= 4) ||
          (navigator.deviceMemory && navigator.deviceMemory <= 4),
        );

        const q = (selector, scope = document) => scope.querySelector(selector);
        const qa = (selector, scope = document) => [
          ...scope.querySelectorAll(selector),
        ];
        const motionElements = new Set();

        function addMotion(selector, className, scope = document) {
          qa(selector, scope).forEach((element) => {
            element.classList.add(className);
            motionElements.add(element);
          });
        }

        function stagger(elements, step = 32, maximum = 96) {
          elements.forEach((element, index) => {
            element.style.setProperty(
              "--motion-delay",
              `${Math.min(index * step, maximum)}ms`,
            );
          });
        }

        function markMotionElements() {
          addMotion(".hero-copy h1", "motion-mask");
          addMotion(".hero-copy > p", "motion-rise");
          addMotion(".hero-actions", "motion-rise");
          addMotion(".simulation-note", "motion-scale");
          addMotion(".simulation-card", "motion-slide-right");

          addMotion("#simulacao .section-head", "motion-slide-left");
          const flowSteps = qa("#simulacao .flow-step");
          flowSteps.forEach((element, index) => {
            element.classList.add(
              index % 2 ? "motion-slide-right" : "motion-slide-left",
            );
            motionElements.add(element);
          });
          stagger(flowSteps, 24, 72);

          addMotion("#fundamentos .section-head", "motion-mask");
          const foundationCards = qa("#fundamentos .card");
          foundationCards.forEach((element) => {
            element.classList.add("motion-scale");
            motionElements.add(element);
          });
          stagger(foundationCards, 32, 64);

          addMotion("#ameacas .section-head", "motion-clip");
          const attacks = qa("#ameacas .attack");
          attacks.forEach((element, index) => {
            element.classList.add(
              index % 2 ? "motion-slide-right" : "motion-slide-left",
            );
            motionElements.add(element);
          });
          stagger(attacks, 18, 72);

          addMotion("#deepfake .deepfake-panel", "motion-zoom");
          const signals = qa("#deepfake .signal");
          signals.forEach((element) => {
            element.classList.add("motion-rise");
            motionElements.add(element);
          });
          stagger(signals, 28, 84);
          addMotion("#deepfake .case-callout", "motion-clip");

          addMotion("#informacoes .section-head", "motion-mask");
          const flags = qa("#informacoes .flag");
          flags.forEach((element) => {
            element.classList.add("motion-clip");
            motionElements.add(element);
          });
          stagger(flags, 22, 44);

          addMotion("#boas-praticas .panel-dark", "motion-slide-left");
          const details = qa("#boas-praticas details");
          details.forEach((element) => {
            element.classList.add("motion-slide-right");
            motionElements.add(element);
          });
          stagger(details, 22, 66);

          addMotion("#incidentes .section-head", "motion-mask");
          const timelineItems = qa("#incidentes .time-item");
          timelineItems.forEach((element) => {
            element.classList.add("motion-rise");
            motionElements.add(element);
          });
          stagger(timelineItems, 28, 84);

          const privacySection = q("#incidentes + section");
          const privacyCards = privacySection
            ? qa(".card", privacySection)
            : [];
          privacyCards.forEach((element, index) => {
            element.classList.add(
              index % 2 ? "motion-slide-right" : "motion-slide-left",
            );
            motionElements.add(element);
          });
          stagger(privacyCards, 28, 56);

          addMotion("#senhas .credentials-intro", "motion-slide-left");
          addMotion("#senhas .hibp-visual", "motion-zoom");
          addMotion("#senhas .credentials-section-head", "motion-mask");

          const hibpSteps = qa("#senhas .hibp-step");
          hibpSteps.forEach((element, index) => {
            element.classList.add(index % 2 ? "motion-rise" : "motion-scale");
            motionElements.add(element);
          });
          stagger(hibpSteps, 22, 66);

          addMotion("#senhas .password-guidance-head", "motion-mask");
          const passwordRules = qa("#senhas .password-rule");
          passwordRules.forEach((element) => {
            element.classList.add("motion-rise");
            motionElements.add(element);
          });
          stagger(passwordRules, 18, 72);

          const credentialExamples = qa("#senhas .credential-example");
          credentialExamples.forEach((element, index) => {
            element.classList.add(
              index % 2 ? "motion-slide-right" : "motion-slide-left",
            );
            motionElements.add(element);
          });
          stagger(credentialExamples, 26, 52);
          addMotion("#senhas .credential-example-note", "motion-rise");
          addMotion("#senhas .hibp-technical-note", "motion-zoom");

          addMotion("#quiz .quiz", "motion-zoom");
          addMotion(".final h2", "motion-mask");
          addMotion(".final p", "motion-rise");
          const commitments = qa(".final .commitment > div");
          commitments.forEach((element) => {
            element.classList.add("motion-scale");
            motionElements.add(element);
          });
          stagger(commitments, 24, 72);
        }

        function reveal(element) {
          if (!element || element.classList.contains("is-visible")) return;
          element.classList.add("is-visible");

          let settled = false;
          const settle = (event) => {
            if (settled || (event && event.propertyName !== "transform"))
              return;
            settled = true;
            element.classList.add("motion-settled");
            element.removeEventListener("transitionend", settle);
          };

          element.addEventListener("transitionend", settle);
          window.setTimeout(() => settle(), 1100);
        }

        function initRevealObserver() {
          if (reducedMotion || !("IntersectionObserver" in window)) {
            motionElements.forEach(reveal);
            qa("main > section").forEach((section) =>
              section.classList.add("section-visible"),
            );
            return;
          }

          const heroElements = qa(
            ".hero .motion-mask, .hero .motion-rise, .hero .motion-scale, .hero .motion-slide-right",
          );
          heroElements.forEach((element, index) => {
            element.style.setProperty(
              "--motion-delay",
              `${Math.min(index * 42, 126)}ms`,
            );
          });

          requestAnimationFrame(() =>
            requestAnimationFrame(() => heroElements.forEach(reveal)),
          );

          /* Elementos com clip-path totalmente fechado não são bons sentinelas de IntersectionObserver.
       Para esses casos, observamos o contêiner visível e revelamos os filhos associados. */
          const observedTargets = new Map();
          const observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                const targets = observedTargets.get(entry.target) || [
                  entry.target,
                ];
                targets.forEach(reveal);
                observer.unobserve(entry.target);
                observedTargets.delete(entry.target);
              }
            },
            {
              root: null,
              rootMargin: "0px 0px -6% 0px",
              threshold: 0.01,
            },
          );

          motionElements.forEach((element) => {
            if (element.closest(".hero")) return;
            const usesClosedClip =
              element.classList.contains("motion-mask") ||
              element.classList.contains("motion-clip");
            const sentinel = usesClosedClip
              ? element.parentElement || element
              : element;
            const targets = observedTargets.get(sentinel) || [];
            targets.push(element);
            observedTargets.set(sentinel, targets);
          });
          observedTargets.forEach((_, sentinel) => observer.observe(sentinel));

          const sectionObserver = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add("section-visible");
                sectionObserver.unobserve(entry.target);
              }
            },
            { rootMargin: "0px 0px -4% 0px", threshold: 0.01 },
          );

          qa("main > section").forEach((section) =>
            sectionObserver.observe(section),
          );
        }

        function nativeScrollTo(target, options = {}) {
          if (!target) return;
          const offset = options.offset ?? -96;
          const top =
            target.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
        }

        function initNavigation() {
          window.kvmScrollTo = nativeScrollTo;

          qa('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
              const href = link.getAttribute("href");
              if (!href || href === "#") return;
              const target = q(href);
              if (!target) return;
              event.preventDefault();
              nativeScrollTo(target, { offset: desktop ? -92 : -188 });
            });
          });

          const topbar = q(".topbar");
          const navLinks = qa('.nav-links a[href^="#"]');
          let scrollFrame = 0;

          const updateTopbar = () => {
            topbar?.classList.toggle("is-scrolled", window.scrollY > 18);
            scrollFrame = 0;
          };

          window.addEventListener(
            "scroll",
            () => {
              if (scrollFrame) return;
              scrollFrame = requestAnimationFrame(updateTopbar);
            },
            { passive: true },
          );
          updateTopbar();

          if ("IntersectionObserver" in window && navLinks.length) {
            const targets = navLinks
              .map((link) => ({ link, target: q(link.getAttribute("href")) }))
              .filter((item) => item.target);

            const navObserver = new IntersectionObserver(
              (entries) => {
                const current = entries
                  .filter((entry) => entry.isIntersecting)
                  .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!current) return;
                navLinks.forEach((link) => link.classList.remove("is-active"));
                targets
                  .find((item) => item.target === current.target)
                  ?.link.classList.add("is-active");
              },
              {
                rootMargin: "-24% 0px -58% 0px",
                threshold: [0.01, 0.18, 0.35],
              },
            );

            targets.forEach((item) => navObserver.observe(item.target));
          }
        }

        function setSurfaceClasses() {
          const lightSurfaces = qa(
            ".card, .attack, .signal, .case-callout, .flag, .time-box, .simulation-note, .accordion > details, .reveal-panel, .hibp-visual-card, .credential-example",
          );
          const darkSurfaces = qa(
            ".flow-step, .panel-dark, .quiz-card, .commitment > div, .hibp-step, .password-rule, .hibp-technical-note",
          );
          lightSurfaces.forEach((surface) =>
            surface.classList.add("motion-surface"),
          );
          darkSurfaces.forEach((surface) =>
            surface.classList.add("motion-dark-surface"),
          );
          return [...lightSurfaces, ...darkSurfaces];
        }

        function initPointerEffects() {
          const surfaces = setSurfaceClasses();
          if (!finePointer || reducedMotion || constrainedDevice) return;

          const cursorGlow = q("#premiumCursorGlow");
          if (cursorGlow) {
            let glowFrame = 0;
            let pointerX = -320;
            let pointerY = -320;
            document.addEventListener(
              "pointermove",
              (event) => {
                pointerX = event.clientX;
                pointerY = event.clientY;
                if (glowFrame) return;
                glowFrame = requestAnimationFrame(() => {
                  cursorGlow.style.transform = `translate3d(${pointerX - 130}px, ${pointerY - 130}px, 0)`;
                  cursorGlow.classList.add("is-visible");
                  glowFrame = 0;
                });
              },
              { passive: true },
            );
            document.addEventListener("pointerleave", () =>
              cursorGlow.classList.remove("is-visible"),
            );
          }

          const frames = new WeakMap();
          surfaces.forEach((surface) => {
            surface.addEventListener(
              "pointermove",
              (event) => {
                if (frames.get(surface)) return;
                const x = event.clientX;
                const y = event.clientY;
                frames.set(
                  surface,
                  requestAnimationFrame(() => {
                    const rect = surface.getBoundingClientRect();
                    surface.style.setProperty("--spot-x", `${x - rect.left}px`);
                    surface.style.setProperty("--spot-y", `${y - rect.top}px`);
                    frames.delete(surface);
                  }),
                );
              },
              { passive: true },
            );
          });

          const simulationCard = q("#simulationCard");
          const device = simulationCard?.querySelector(".device");
          if (simulationCard && device) {
            let deviceFrame = 0;
            let pointerX = 0;
            let pointerY = 0;
            simulationCard.addEventListener(
              "pointermove",
              (event) => {
                if (simulationCard.classList.contains("revealed")) return;
                pointerX = event.clientX;
                pointerY = event.clientY;
                if (deviceFrame) return;
                deviceFrame = requestAnimationFrame(() => {
                  const rect = simulationCard.getBoundingClientRect();
                  const x = ((pointerX - rect.left) / rect.width) * 2 - 1;
                  const y = ((pointerY - rect.top) / rect.height) * 2 - 1;
                  device.style.setProperty("--tilt-x", `${x * 1.5}deg`);
                  device.style.setProperty("--tilt-y", `${y * -1.2}deg`);
                  device.style.setProperty("--shift-x", `${x * 2}px`);
                  device.style.setProperty("--shift-y", `${y * 1.5}px`);
                  deviceFrame = 0;
                });
              },
              { passive: true },
            );
            simulationCard.addEventListener("pointerleave", () => {
              ["--tilt-x", "--tilt-y", "--shift-x", "--shift-y"].forEach(
                (name) => device.style.removeProperty(name),
              );
            });
          }

          document.addEventListener("pointerdown", (event) => {
            const control = event.target.closest(".btn, .answer");
            if (!control || control.disabled) return;
            const rect = control.getBoundingClientRect();
            const ripple = document.createElement("span");
            ripple.className = "motion-ripple";
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;
            control.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove(), {
              once: true,
            });
          });
        }

        function animateItems(items, keyframes, options = {}) {
          if (
            reducedMotion ||
            !items.length ||
            typeof items[0].animate !== "function"
          )
            return;
          items.forEach((element, index) => {
            element.animate(keyframes, {
              duration: options.duration ?? 300,
              delay: Math.min(
                index * (options.stagger ?? 24),
                options.maxDelay ?? 72,
              ),
              easing: options.easing ?? "cubic-bezier(.16,1,.3,1)",
              fill: "both",
            });
          });
        }

        function initDynamicStates() {
          const simulationCard = q("#simulationCard");
          if (simulationCard && "MutationObserver" in window) {
            new MutationObserver(() => {
              if (!simulationCard.classList.contains("revealed")) return;
              const device = q(".device", simulationCard);
              ["--tilt-x", "--tilt-y", "--shift-x", "--shift-y"].forEach(
                (name) => device?.style.removeProperty(name),
              );
              animateItems(
                qa(".red-flags > div", simulationCard),
                [
                  { opacity: 0, transform: "translate3d(-10px,0,0)" },
                  { opacity: 1, transform: "translate3d(0,0,0)" },
                ],
                { duration: 280, stagger: 34 },
              );
            }).observe(simulationCard, {
              attributes: true,
              attributeFilter: ["class"],
            });
          }

          const answers = q("#answers");
          const feedback = q("#quizFeedback");
          if (answers && "MutationObserver" in window) {
            const animateAnswers = () =>
              animateItems(
                qa(".answer", answers),
                [
                  {
                    opacity: 0.15,
                    transform: "translate3d(0,8px,0) scale(.99)",
                  },
                  { opacity: 1, transform: "translate3d(0,0,0) scale(1)" },
                ],
                { duration: 240, stagger: 20, maxDelay: 44 },
              );
            new MutationObserver(animateAnswers).observe(answers, {
              childList: true,
            });
            animateAnswers();

            if (feedback) {
              new MutationObserver(() => {
                if (
                  !feedback.textContent.trim() ||
                  reducedMotion ||
                  typeof feedback.animate !== "function"
                )
                  return;
                feedback.animate(
                  [
                    { opacity: 0.45, transform: "translate3d(0,5px,0)" },
                    { opacity: 1, transform: "translate3d(0,0,0)" },
                  ],
                  { duration: 220, easing: "cubic-bezier(.16,1,.3,1)" },
                );
              }).observe(feedback, {
                childList: true,
                characterData: true,
                subtree: true,
              });
            }
          }
        }

        function initParallax() {
          const progressElement = q("#progress");
          const targets = [
            { selector: ".hero-intro", strength: 30 },
            { selector: "#simulationCard .device", strength: -20 },
            { selector: "#simulacao .flow", strength: 16 },
            { selector: "#deepfake .deepfake-spotlight", strength: -24 },
            { selector: "#informacoes .classification", strength: 18 },
            { selector: "#incidentes .timeline", strength: -14 },
            { selector: ".final .container", strength: 18 },
          ]
            .map((item) => ({
              ...item,
              element: q(item.selector),
              top: 0,
              height: 0,
            }))
            .filter((item) => item.element);

          targets.forEach((item) => {
            item.element.dataset.parallax = "";
            item.element.style.setProperty(
              "--parallax-strength",
              `${item.strength}px`,
            );
          });

          if (!targets.length) return;

          const mobileFactor = desktop ? 1 : 0.48;
          const performanceFactor = constrainedDevice ? 0.58 : 1;
          const motionFactor = reducedMotion
            ? 0
            : mobileFactor * performanceFactor;
          let viewportHeight = window.innerHeight;
          let scrollFrame = 0;
          let resizeFrame = 0;

          const clamp = (value, min, max) =>
            Math.min(max, Math.max(min, value));

          const measure = () => {
            viewportHeight = window.innerHeight;
            const scrollY =
              window.scrollY || document.documentElement.scrollTop || 0;
            targets.forEach((item) => {
              const rect = item.element.getBoundingClientRect();
              item.top = rect.top + scrollY;
              item.height = Math.max(1, rect.height);
            });
            render();
          };

          const render = () => {
            scrollFrame = 0;
            const scrollY =
              window.scrollY || document.documentElement.scrollTop || 0;
            const maxScroll = Math.max(
              1,
              document.documentElement.scrollHeight - viewportHeight,
            );
            const ratio = clamp(scrollY / maxScroll, 0, 1);

            root.style.setProperty("--page-progress", ratio.toFixed(4));
            root.style.setProperty(
              "--parallax-page-slow",
              `${(-Math.min(scrollY * 0.016, 128)).toFixed(2)}px`,
            );
            root.style.setProperty(
              "--parallax-page-grid",
              `${(-Math.min(scrollY * 0.026, 190)).toFixed(2)}px`,
            );
            root.style.setProperty(
              "--hero-parallax-bg",
              `${Math.min(scrollY * 0.038, 72).toFixed(2)}px`,
            );
            root.style.setProperty(
              "--final-parallax-grid",
              `${(-Math.max(0, scrollY - maxScroll * 0.76) * 0.025).toFixed(2)}px`,
            );

            if (progressElement)
              progressElement.style.transform = `scaleX(${ratio})`;
            else window.kvmUpdateProgress?.(ratio);

            if (!motionFactor) return;

            const viewportCenter = viewportHeight * 0.5;
            for (const item of targets) {
              const centerInViewport = item.top - scrollY + item.height * 0.5;
              const range = viewportHeight * 0.5 + item.height * 0.5;
              const normalized = clamp(
                (centerInViewport - viewportCenter) / range,
                -1,
                1,
              );
              const offset = -normalized * item.strength * motionFactor;
              item.element.style.setProperty(
                "--parallax-y",
                `${offset.toFixed(2)}px`,
              );

              if (item.selector.startsWith("#deepfake")) {
                q("#deepfake")?.style.setProperty(
                  "--deepfake-parallax",
                  `${(offset * 1.6).toFixed(2)}px`,
                );
              }
            }
          };

          const requestRender = () => {
            if (scrollFrame) return;
            scrollFrame = requestAnimationFrame(render);
          };

          window.addEventListener("scroll", requestRender, { passive: true });
          window.addEventListener(
            "resize",
            () => {
              if (resizeFrame) cancelAnimationFrame(resizeFrame);
              resizeFrame = requestAnimationFrame(measure);
            },
            { passive: true },
          );

          document.fonts?.ready.then(measure);
          window.addEventListener("load", measure, { once: true });
          measure();
        }

        function initLifecycle() {
          document.addEventListener("visibilitychange", () => {
            root.classList.toggle("page-paused", document.hidden);
          });
        }

        function init() {
          root.classList.add("motion-system-initializing");
          markMotionElements();
          root.classList.add("motion-system-ready");
          requestAnimationFrame(() =>
            root.classList.remove("motion-system-initializing"),
          );
          initNavigation();
          initPointerEffects();
          initParallax();
          initRevealObserver();
          initDynamicStates();
          initLifecycle();
        }

        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", init, { once: true });
        } else {
          init();
        }
      })();
