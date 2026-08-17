const card = document.getElementById("simulationCard");
      const toast = document.getElementById("toast");
      const reveal = () => {
        card.classList.add("revealed");
        toast.classList.add("visible");
        setTimeout(() => toast.classList.remove("visible"), 6200);
        window.kvmScrollTo
          ? window.kvmScrollTo(document.getElementById("revealPanel"), {
              offset: -118,
            })
          : document
              .getElementById("revealPanel")
              .scrollIntoView({ behavior: "smooth", block: "center" });
      };
      document
        .getElementById("validateAccess")
        .addEventListener("click", reveal);
      document
        .getElementById("downloadAttempt")
        .addEventListener("click", reveal);

      const progress = document.getElementById("progress");
      window.kvmUpdateProgress = (ratio) => {
        if (!progress) return;
        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio || 0))})`;
      };
      window.kvmUpdateProgress(0);
