import { calculateEverything } from "@ics4u-assignment-02/utils";
import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";
const form = document.getElementById("form");
const canvas = document.getElementById("graph") as HTMLCanvasElement;
const history = document.getElementById("history");
const message = document.getElementById("message");
const copyChecker = new Set();

drawGraph(
  { a: NaN, b: NaN, c: NaN, d: NaN },
  {
    r1: { x: NaN, y: NaN },
    r2: { x: NaN, y: NaN },
    r3: { x: NaN, y: NaN },
  },
  canvas,
);

function getCoefficients(): Coefficients {
  const formData = new FormData(form);
  return {
    a: Number(formData.get("a")),
    b: Number(formData.get("b")),
    c: Number(formData.get("c")),
    d: Number(formData.get("d")),
  };
}
if (history.textContent.includes("Click a row to load history.")) {
  message.innerHTML = `<h1 class = "text-slate-500 text-sm italic">e<h1/>`;
}
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  message.innerHTML = `<h1 class = "text-slate-500 text-sm italic">Click a row to load history.<h1/>`;

  const block = document.createElement("div");
  block.className = "flex items-center gap-2";

  const coeffs = document.createElement("button");
  coeffs.className = "flex-1 text-left p-3 rounded-xl big-slate-800/40 border border-slate-700 hover:bg-slate-800/70 transition";

  const vars = getCoefficients();

  const duplicate = `${vars.a},${vars.b},${vars.c},${vars.d}`;

  if (copyChecker.has(duplicate)) {
    console.log("should probably stop here cuz theres a duplicate");
    return;
  }
  copyChecker.add(duplicate);

  coeffs.innerHTML = `<div class="grid grid-cols-4 font-mono text-slate-200 text-sm">
  <span class="text-center">${vars.a}</span>
  <span class="text-center">${vars.b}</span>
  <span class="text-center">${vars.c}</span>
  <span class="text-center">${vars.d}</span></div>`;

  coeffs.addEventListener("click", (event) => {
    event.preventDefault();
    const a = vars.a;
    const b = vars.b;
    const c = vars.c;
    const d = vars.d;
    console.log(vars.a, vars.b, vars.c, vars.d);
    calculateEverything(a, b, c, d);
  });

  const delButton = document.createElement("button");
  delButton.innerHTML = `<button class="px-3 py-2 text-xs font-medium rounded-lg border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition">Delete</button>`;
  delButton.addEventListener("click", (event) => {
    event.preventDefault();
    block.remove();
  });
  block.appendChild(coeffs);
  block.appendChild(delButton);
  history?.insertBefore(block, message);
});

form.addEventListener("input", (event) => {
  event.preventDefault();

  const { a, b, c, d }: Coefficients = getCoefficients();

  calculateEverything(a, b, c, d);
});
