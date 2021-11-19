import { useEffect, useRef } from "react";

// draw an animated clock
function drawClock(ctx: CanvasRenderingContext2D, length: number) {
  const radius = length / 2 - 2;
  ctx.save();

  const hourHandLength = radius * 0.5;
  const minuteHandLength = radius * 0.7;
  const secondHandLength = radius * 0.9;
  const secondHandWidth = radius * 0.01;
  const hourHandWidth = radius * 0.03;
  const minuteHandWidth = radius * 0.05;

  const now = new Date();
  const second = now.getSeconds();
  const minute = now.getMinutes() + second / 60;
  const hour = now.getHours() + minute / 60;

  ctx.clearRect(0, 0, length, length);
  ctx.translate(length / 2, length / 2);

  // draw circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#6a5a9f";
  ctx.stroke();

  // draw numbers
  ctx.font = `${radius * 0.2}px Arial`;
  ctx.fillStyle = "#333";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let i = 1; i < 13; i++) {
    const theta = (i / 12 - 0.25) * 2 * Math.PI;
    ctx.fillText(
      i.toString(),
      radius * 0.85 * Math.cos(theta),
      radius * 0.85 * Math.sin(theta)
    );
  }

  // draw hour hand
  const hourTheta = (hour / 12 - 0.25) * 2 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(
    hourHandLength * Math.cos(hourTheta),
    hourHandLength * Math.sin(hourTheta)
  );
  ctx.lineWidth = hourHandWidth;
  ctx.strokeStyle = "#333";
  ctx.stroke();

  // draw minute hand
  const minuteTheta = (minute / 60 - 0.25) * 2 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(
    minuteHandLength * Math.cos(minuteTheta),
    minuteHandLength * Math.sin(minuteTheta)
  );
  ctx.lineWidth = minuteHandWidth;
  ctx.strokeStyle = "#333";
  ctx.stroke();

  // draw second hand
  const secondTheta = (second / 60 - 0.25) * 2 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(
    secondHandLength * Math.cos(secondTheta),
    secondHandLength * Math.sin(secondTheta)
  );
  ctx.lineWidth = secondHandWidth;
  ctx.strokeStyle = "#f00";
  ctx.stroke();

  ctx.restore();

  requestAnimationFrame(() => drawClock(ctx, length));
}

export default function Clock({ length }: { length: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        requestAnimationFrame(() => drawClock(ctx, length));
      }
    }
  }, [length]);

  return <canvas width={length} height={length} ref={canvasRef} />;
}
