const surpriseBtn = document.getElementById("surpriseBtn");
const modal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");
const finalBtn = document.getElementById("finalBtn");
const confettiCanvas = document.getElementById("confetti");

surpriseBtn.addEventListener("click", () => {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
});

const quizQuestions = document.querySelectorAll(".q");
quizQuestions.forEach((q) => {
  q.addEventListener("click", (event) => {
    const btn = event.target.closest(".opt");
    if (!btn) return;
    const answer = q.dataset.answer;
    q.querySelectorAll(".opt").forEach((opt) => {
      opt.classList.remove("correct", "wrong");
    });
    if (btn.dataset.choice === answer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });
});

finalBtn.addEventListener("click", () => {
  launchConfetti();
  finalBtn.textContent = "I love you forever";
});

const ctx = confettiCanvas.getContext("2d");
let confetti = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  confetti = Array.from({ length: 160 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -20 - Math.random() * confettiCanvas.height,
    size: 6 + Math.random() * 6,
    speed: 2 + Math.random() * 4,
    angle: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.2,
    color: ["#e74f70", "#ffd6c6", "#ffe19e", "#b7f3c0"][Math.floor(Math.random() * 4)]
  }));
  requestAnimationFrame(tick);
}

function tick() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c) => {
    c.y += c.speed;
    c.angle += c.spin;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.angle);
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
    ctx.restore();
  });
  confetti = confetti.filter((c) => c.y < confettiCanvas.height + 40);
  if (confetti.length > 0) {
    requestAnimationFrame(tick);
  }
}
