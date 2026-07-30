import { useEffect, useRef } from 'react'
import './Face.css'

// Pupils sit off-center within their eyelid, so how far each can travel
// before the eyelid's clip-path crops it differs left vs right. These are
// measured directly from the path geometry below (eyelid bounds minus
// pupil bounds), not derived at runtime — getBBox() on a path that only
// exists inside a <clipPath> is unreliable across browsers.
const PUPILS = [
  { id: 'l', cx: 778.893, cy: 586.114, maxLeft: 80.99, maxRight: 104.81 },
  { id: 'r', cx: 1083.8, cy: 586.114, maxLeft: 98.19, maxRight: 87.61 },
]

function Face() {
  const svgRef = useRef(null)
  const pupilRefs = useRef({})
  const stateRef = useRef(PUPILS.map((p) => ({ ...p, x: 0 })))
  const targetRef = useRef({ x: null })

  useEffect(() => {
    const svg = svgRef.current
    const clamp = (v, m) => Math.max(-m, Math.min(m, v))

    const toClient = (ux, uy) => {
      const m = svg.getScreenCTM()
      return { x: ux * m.a + uy * m.c + m.e, y: ux * m.b + uy * m.d + m.f }
    }

    const move = (e) => {
      const p = e.touches ? e.touches[0] : e
      targetRef.current = { x: p.clientX }
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('touchmove', move, { passive: true })

    const reach = () => Math.max(window.innerWidth, window.innerHeight) * 0.35

    let frame
    const loop = () => {
      const { x: targetX } = targetRef.current
      if (targetX !== null) {
        const r = reach()
        for (const p of stateRef.current) {
          const c = toClient(p.cx, p.cy)
          const norm = clamp((targetX - c.x) / r, 1)
          const tx = norm * (norm >= 0 ? p.maxRight : p.maxLeft)
          p.x += (tx - p.x) * 0.18
          const el = pupilRefs.current[p.id]
          if (el) el.setAttribute('transform', `translate(${p.x.toFixed(2)} 0)`)
        }
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('touchmove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="face-svg"
      viewBox="590 230 680 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="face-filter" x="921" y="256.812" width="316" height="444.188" filterUnits="userSpaceOnUse">
          <feOffset result="offset" dy="14" in="SourceAlpha" />
          <feGaussianBlur result="blur" stdDeviation="2.646" />
          <feFlood result="flood" floodOpacity="0.67" />
          <feComposite result="composite" operator="in" in2="blur" />
          <feBlend result="blend" in="SourceGraphic" />
        </filter>
        <filter id="face-filter-2" x="618" y="441.5" width="619" height="359.5" filterUnits="userSpaceOnUse">
          <feOffset result="offset" dy="14" in="SourceAlpha" />
          <feGaussianBlur result="blur" stdDeviation="2.646" />
          <feFlood result="flood" floodOpacity="0.67" />
          <feComposite result="composite" operator="in" in2="blur" />
          <feBlend result="blend" in="SourceGraphic" />
        </filter>
        <clipPath id="face-clip-l">
          <path d="M790.8,528.943c65.78,0,119.106,25.6,119.106,57.171s-53.326,57.17-119.106,57.17S671.7,617.688,671.7,586.114,725.024,528.943,790.8,528.943Z" />
        </clipPath>
        <clipPath id="face-clip-r">
          <path d="M1078.52,528.943c65.78,0,119.1,25.6,119.1,57.171s-53.32,57.17-119.1,57.17-119.107-25.6-119.107-57.17S1012.74,528.943,1078.52,528.943Z" />
        </clipPath>
      </defs>
      <g>
        <path
          className="face-ear"
          filter="url(#face-filter)"
          d="M1199.34,671.87c49.52-28.918,35.78-142.773-19.06-319.2-14.58-46.9-33.77-88.271-66.7-95.285-21.25-4.526-60.55,18.216-109.58,71.464-43.532,47.282-74.222,96.368-76.224,114.342C913.42,572.018,1126.02,714.68,1199.34,671.87Z"
        />
        <path
          className="face-head"
          filter="url(#face-filter-2)"
          d="M927.012,441.485c167.318,0,302.958,75.57,302.958,168.79s-135.64,168.79-302.958,168.79S624.056,703.5,624.056,610.275,759.694,441.485,927.012,441.485Z"
        />
        <path
          className="face-ear"
          d="M652.641,671.87c-49.525-28.918-35.788-142.773,19.057-319.2,14.579-46.9,33.772-88.271,66.7-95.285,21.252-4.526,60.549,18.216,109.578,71.464C891.51,376.127,922.2,425.213,924.2,443.187,938.558,572.018,725.957,714.68,652.641,671.87Z"
        />
        <path
          className="face-eye"
          d="M790.8,528.943c65.78,0,119.106,25.6,119.106,57.171s-53.326,57.17-119.106,57.17S671.7,617.688,671.7,586.114,725.024,528.943,790.8,528.943Z"
        />
        <path
          className="face-eye"
          d="M1078.52,528.943c65.78,0,119.1,25.6,119.1,57.171s-53.32,57.17-119.1,57.17-119.107-25.6-119.107-57.17S1012.74,528.943,1078.52,528.943Z"
        />
        <g clipPath="url(#face-clip-l)">
          <path
            ref={(el) => (pupilRefs.current.l = el)}
            className="face-pupil"
            d="M778.893,528.943c14.472,0,26.2,25.6,26.2,57.171s-11.732,57.17-26.2,57.17-26.2-25.6-26.2-57.17S764.422,528.943,778.893,528.943Z"
          />
        </g>
        <g clipPath="url(#face-clip-r)">
          <path
            ref={(el) => (pupilRefs.current.r = el)}
            className="face-pupil"
            d="M1083.8,528.943c14.48,0,26.21,25.6,26.21,57.171s-11.73,57.17-26.21,57.17-26.2-25.6-26.2-57.17S1069.33,528.943,1083.8,528.943Z"
          />
        </g>
      </g>
    </svg>
  )
}

export default Face
