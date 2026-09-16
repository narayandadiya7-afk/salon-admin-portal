import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { themes, ThemeMode } from '../../config/theme';
import styles from './NotFound.module.css';

/* ── primary-hover map matching theme config ── */
const primaryHoverMap: Record<ThemeMode, string> = {
  light:    '#40a9ff',
  dark:     '#40a9ff',
  midnight: '#60a5fa',
  nord:     '#81a1c1',
  dracula:  '#ff79c6',
  ocean:    '#0ea5e9',
  forest:   '#10b981',
  slate:    '#64748b',
};

function injectThemeRgb() {
  const root = document.documentElement;
  const primary =
    root.style.getPropertyValue('--theme-primary').trim() ||
    getComputedStyle(root).getPropertyValue('--theme-primary').trim() ||
    '#1890ff';

  const saved = localStorage.getItem('app-theme') as ThemeMode | null;
  const validThemes = Object.keys(themes) as ThemeMode[];
  const mode: ThemeMode = saved && validThemes.includes(saved) ? saved : 'light';

  // Set primary-hover CSS var so the CSS can use it
  root.style.setProperty('--theme-primary-hover', primaryHoverMap[mode]);

  // Convert primary color to rgb triplet for rgba() usage in CSS
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  root.style.setProperty('--nf-primary-rgb', `${r},${g},${b}`);
}

/* ── Wave canvas ── */
function WaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getCol = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--nf-primary-rgb').trim() || '24,144,255';

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.004;
      const col = getCol();
      const waves = [
        { amp: 38, freq: 0.0028, speed: 1.0, y: 0.55, alpha: 0.06 },
        { amp: 28, freq: 0.0038, speed: 1.4, y: 0.60, alpha: 0.05 },
        { amp: 20, freq: 0.005,  speed: 0.8, y: 0.65, alpha: 0.04 },
      ];

      waves.forEach(w => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 3) {
          const y =
            canvas.height * w.y +
            Math.sin(x * w.freq + t * w.speed) * w.amp +
            Math.sin(x * w.freq * 1.7 + t * w.speed * 0.6) * (w.amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = `rgba(${col},${w.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className={styles.waveCanvas} />;
}

/* ── Counter hook ── */
function useCounter(target: number, duration = 1200, startDelay = 300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const t0 = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
        else setValue(target);
      };
      raf = requestAnimationFrame(step);
    }, startDelay);
    return () => {
      clearTimeout(t0);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, startDelay]);

  return value;
}

/* ── Main component ── */
export default function NotFound() {
  const [ready, setReady] = useState(false);
  const count = useCounter(404, 1000, 400);
  const navigate = useNavigate();

  const display = count < 100 ? String(count).padStart(3, '0') : String(count);

  useEffect(() => {
    injectThemeRgb();

    // Re-inject when theme class changes on body
    const obs = new MutationObserver(() => injectThemeRgb());
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const t = setTimeout(() => setReady(true), 40);
    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.root} ${ready ? styles.ready : ''}`}>
      <div className={styles.backdrop} />
      <WaveCanvas />

      <main className={styles.content}>
        {/* 404 number with glitch + shine */}
        <div className={styles.counterWrap}>
          <span className={styles.counterNum} data-text={display}>
            {display}
            <span className={styles.glitchLayer1} aria-hidden="true">{display}</span>
            <span className={styles.glitchLayer2} aria-hidden="true">{display}</span>
          </span>
          <div className={styles.rule} />
        </div>

        {/* label row */}
        <div className={styles.labelRow}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>Page Not Found</span>
          <span className={styles.labelLine} />
        </div>

        <p className={styles.desc}>
          The page you&apos;re looking for doesn&apos;t exist<br />
          or may have been moved.
        </p>

        <button className={styles.btn} onClick={() => navigate('/')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Home
        </button>
      </main>
    </div>
  );
}
