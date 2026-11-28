import React, { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* ─────────────────────────────────────────────────────────────────────────────
   CursorGlow — a soft warm spotlight that trails the cursor across the page.
   Uses CSS variables on a single fixed element; one rAF per frame, eased.
───────────────────────────────────────────────────────────────────────────── */
export function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    let tx = window.innerWidth / 2, ty = window.innerHeight / 3
    let x = tx, y = ty, raf = null

    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.setProperty('--gx', `${x}px`)
      el.style.setProperty('--gy', `${y}px`)
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : null
    }
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY
      el.style.opacity = '1'
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => { el.style.opacity = '0' }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

/* ─────────────────────────────────────────────────────────────────────────────
   ScrollProgress — thin accent bar showing how far down the page you are.
───────────────────────────────────────────────────────────────────────────── */
export function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    let raf = null
    const update = () => {
      raf = null
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}

/* ─────────────────────────────────────────────────────────────────────────────
   DotField — canvas grid of dots behind the hero. Dots near the cursor swell,
   warm to the accent colour and get pushed gently outward. A slow ambient
   wave keeps it alive when the cursor is elsewhere (and on touch devices).
───────────────────────────────────────────────────────────────────────────── */
export function DotField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()
    const GAP = 28
    const RADIUS = 170

    let w = 0, h = 0, dpr = 1, dots = []
    let mx = -9999, my = -9999, active = false
    let raf = null, visible = true, t0 = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const cols = Math.ceil(w / GAP) + 1, rows = Math.ceil(h / GAP) + 1
      const ox = (w - (cols - 1) * GAP) / 2, oy = (h - (rows - 1) * GAP) / 2
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ x: ox + c * GAP, y: oy + r * GAP })
      if (reduced) draw(0)
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h)
      const t = time / 1000
      for (const d of dots) {
        // Ambient diagonal wave
        const wave = reduced ? 0 : (Math.sin(d.x * 0.012 + d.y * 0.008 - t * 0.9) + 1) / 2
        let x = d.x, y = d.y, k = 0
        if (active) {
          const dx = d.x - mx, dy = d.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < RADIUS) {
            k = 1 - dist / RADIUS
            k = k * k * (3 - 2 * k) // smoothstep
            const push = k * 10 / (dist || 1)
            x += dx * push; y += dy * push
          }
        }
        // Vertical fade so the field dissolves toward the bottom
        const fade = Math.max(0, 1 - (d.y / h) * 0.85)
        const size = 0.9 + wave * 0.5 + k * 2.2
        const alpha = (0.10 + wave * 0.08) * fade + k * 0.75
        // Blend from muted cream to accent amber as k rises
        const r = Math.round(160 + (196 - 160) * k)
        const g = Math.round(154 + (122 - 154) * k)
        const b = Math.round(142 + (44 - 142) * k)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = (now) => {
      raf = null
      if (!visible) return
      draw(now - t0)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mx = e.clientX - rect.left; my = e.clientY - rect.top
      active = my > -RADIUS && my < rect.height + RADIUS
      if (reduced) draw(0)
    }
    const onLeave = () => { active = false; if (reduced) draw(0) }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduced && !raf) raf = requestAnimationFrame(loop)
    })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

/* ─────────────────────────────────────────────────────────────────────────────
   Kanji — huge faint section number sitting behind a section heading.
   Drifts slightly with scroll for depth.
───────────────────────────────────────────────────────────────────────────── */
export function Kanji({ children, className = '', style }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    let raf = null, inView = false
    const update = () => {
      raf = null
      const rect = el.parentElement.getBoundingClientRect()
      const p = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      el.style.transform = `translate3d(0, ${p * -60}px, 0)`
    }
    const onScroll = () => { if (inView && !raf) raf = requestAnimationFrame(update) }
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) onScroll() })
    io.observe(el.parentElement)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <span ref={ref} className={`kanji-mark ${className}`} style={style} aria-hidden="true">
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CountUp — animates the leading number of a string ("1,000+" → 0…1,000+)
   the first time it scrolls into view. Non-numeric strings render as-is.
───────────────────────────────────────────────────────────────────────────── */
export function CountUp({ value, duration = 1600 }) {
  const match = /^([\d,]+)(.*)$/.exec(value)
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null
  const [n, setN] = useState(target === null || prefersReducedMotion() ? target : 0)
  const ref = useRef(null)

  useEffect(() => {
    if (target === null || prefersReducedMotion()) return
    const el = ref.current
    let raf = null
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 4)
        setN(Math.round(target * eased))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf) }
  }, [target, duration])

  if (target === null) return <span>{value}</span>
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{n.toLocaleString('en-US')}{match[2]}</span>
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   useActiveSection — id of the section currently under the middle of the
   viewport, for nav highlighting.
───────────────────────────────────────────────────────────────────────────── */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids.join(',')])
  return active
}

/* ─────────────────────────────────────────────────────────────────────────────
   useTilt — subtle 3D tilt toward the cursor on a card.
───────────────────────────────────────────────────────────────────────────── */
export function useTilt(max = 8) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateX(${-ny * max}deg) rotateY(${nx * max}deg)`
      el.style.setProperty('--shine-x', `${(nx + 0.5) * 100}%`)
      el.style.setProperty('--shine-y', `${(ny + 0.5) * 100}%`)
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [max])
  return ref
}
