import { drawGraph } from "@ics4u-assignment-02/utils";

export function calculateEverything(a, b, c, d) {
  const canvas = document.getElementById("graph") as HTMLCanvasElement;
  const round = (n) => Number(n.toFixed(4));
  function getSign(s, flip) {
    if (Math.sign(s) >= 0) {
      if (flip === true) {
        return "-";
      } else {
        return "+";
      }
    } else {
      if (flip === true) {
        return "+";
      } else {
        return "-";
      }
    }
  }
  const setText = (id, value) => {
    const element = document.getElementById(id);
    element.innerText = String(value);
  };

  const p = (3 * a * c - b ** 2) / (3 * a ** 2);
  const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);

  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;
  setText("p", round(p));

  setText("q", round(q));

  setText("discriminant", round(discriminant));

  const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt((-(p / 3)) ** 3)));

  if (round(discriminant) > 0) {
    const root1 =
      Math.cbrt(-q / 2 + Math.sqrt((q / 2) ** 2 + (p / 3) ** 3)) + Math.cbrt(-q / 2 - Math.sqrt((q / 2) ** 2 + (p / 3) ** 3)) - (b / 3) * a;
    setText("root-one", `x: ${round(root1)} | y: 0.0000`);
    setText("root-two", "x: Imaginary | y: Imaginary");
    setText("root-three", "x: Imaginary | y: Imaginary");
    setText("roots", "1 Real Root, 2 Complex Roots");
    setText("factored", "No Real Factorization");
    drawGraph(
      { a, b, c, d },
      {
        r1: { x: root1, y: 0 },
        r2: { x: NaN, y: NaN },
        r3: { x: NaN, y: NaN },
      },
      canvas,
    );
  } else if (round(discriminant) < 0) {
    const root1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    const root2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a);
    const root3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a);
    setText("root-one", `x: ${round(root1)} | y: 0.0000`);
    setText("root-two", `x: ${round(root2)} | y: 0.0000`);
    setText("root-three", `x: ${round(root3)} | y: 0.0000`);
    setText("roots", "3 Distinct Real Roots");
    setText(
      "factored",
      `${a}(x ${getSign(root1, true)} ${round(Math.abs(root1))})(x ${getSign(root2, true)} ${round(Math.abs(root2))})(x ${getSign(root3, true)} ${round(Math.abs(root3))})`,
    );
    drawGraph(
      { a, b, c, d },
      {
        r1: { x: root1, y: 0 },
        r2: { x: root2, y: 0 },
        r3: { x: root3, y: 0 },
      },
      canvas,
    );
  } else {
    if (Number.isNaN(p)) {
      setText("root-one", "x: N/A | y: N/A");
      setText("root-two", "x: N/A | y: N/A");
      setText("root-three", "x: N/A | y: N/A");
      setText("roots", "N/A");
      setText("factored", "No real factorization");
      drawGraph(
        { a, b, c, d },
        {
          r1: { x: NaN, y: 0 },
          r2: { x: NaN, y: 0 },
          r3: { x: NaN, y: 0 },
        },
        canvas,
      );
    } else if (p !== 0) {
      const doubleRoot = Math.cbrt(q / 2) - b / (3 * a);
      const singleRoot = -Math.cbrt(4 * q) - b / (3 * a);
      setText("root-one", `x: ${round(doubleRoot)} | y: 0.0000`);
      setText("root-two", `x: ${round(doubleRoot)} | y: 0.0000`);
      setText("root-three", `x: ${round(singleRoot)} | y: 0.0000`);

      setText("roots", "Double Real Roots, Single Real Root");
      setText(
        "factored",
        `${a}(x ${getSign(doubleRoot, true)} ${round(Math.abs(doubleRoot))})²(x${getSign(singleRoot, true)} ${round(Math.abs(singleRoot))})`,
      );
      drawGraph(
        { a, b, c, d },
        {
          r1: { x: doubleRoot, y: 0 },
          r2: { x: doubleRoot, y: 0 },
          r3: { x: singleRoot, y: 0 },
        },
        canvas,
      );
    } else {
      const tripleRoot =
        Math.cbrt(-q / 2 + Math.sqrt((q / 2) ** 2 + (p / 3) ** 3)) +
        Math.cbrt(-q / 2 - Math.sqrt((q / 2) ** 2 + (p / 3) ** 3)) -
        b / (3 * a);
      setText("root-one", `x: ${round(tripleRoot)} | y: 0.0000`);
      setText("root-two", `x: ${round(tripleRoot)} | y: 0.0000`);
      setText("root-three", `x: ${round(tripleRoot)} | y: 0.0000`);
      setText("roots", "Triple Real Roots");
      setText("factored", `${a}(x ${getSign(tripleRoot, true)} ${round(Math.abs(tripleRoot))})³`);
      drawGraph(
        { a, b, c, d },
        {
          r1: { x: tripleRoot, y: 0 },
          r2: { x: tripleRoot, y: 0 },
          r3: { x: tripleRoot, y: 0 },
        },
        canvas,
      );
    }
  }

  if (a !== 0) {
    let expanded = `${a}x³`;
    let deriv1 = `${a * 3}x²`;
    let deriv2 = `${a * 6}x`;

    setText("equation", expanded);
    setText("first-derivative", deriv1);
    setText("second-derivative", deriv2);
    setText("minimum", "x: N/A | y: N/A");
    setText("maximum", "x: N/A | y: N/A");
    if (b !== 0) {
      expanded += ` ${getSign(b, false)} ${Math.abs(b)}x²`;
      deriv1 += ` ${getSign(b, false)} ${Math.abs(b * 2)}x`;
      deriv2 += ` ${getSign(b, false)} ${Math.abs(b * 2)}`;
      setText("first-derivative", deriv1);
      setText("second-derivative", deriv2);
      if (c !== 0) {
        expanded += ` ${getSign(c, false)}  ${Math.abs(c)}x`;
        deriv1 += ` ${getSign(c, false)} ${Math.abs(c)}`;
        setText("equation", expanded);
        setText("first-derivative", deriv1);
        if (d !== 0) {
          expanded += ` ${getSign(d, false)} ${d}`;
          setText("equation", expanded);
        }
      }
    }
    const derDiscrim = b ** 2 - 3 * a * c;

    if (derDiscrim > 0) {
      const sqrtD = Math.sqrt(derDiscrim);
      const x1 = (-b - sqrtD) / (3 * a);
      const x2 = (-b + sqrtD) / (3 * a);

      const y1 = a * x1 ** 3 + b * x1 ** 2 + c * x1 + d;
      const y2 = a * x2 ** 3 + b * x2 ** 2 + c * x2 + d;

      const point1 = `x: ${round(x1)} | y: ${round(y1)}`;
      const point2 = `x: ${round(x2)} | y: ${round(y2)}`;

      // Second derivative test: f''(x) = 6ax + 2b
      const der2Test = 6 * a * x1 + 2 * b;

      if (der2Test < 0) {
        setText("maximum", point1);
        setText("minimum", point2);
      } else {
        setText("minimum", point1);
        setText("maximum", point2);
      }
    }
  }
}
