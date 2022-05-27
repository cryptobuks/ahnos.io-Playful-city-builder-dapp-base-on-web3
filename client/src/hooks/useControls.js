import { useEffect, useRef } from 'react'

export function useKeypress(target, event) {
  useEffect(() => {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true)
    const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])
}

export function useControls() {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })
  useKeypress(['ArrowUp', 'w'], (pressed) =>
    setTimeout(() => (keys.current.forward = pressed), 100),
  )
  useKeypress(['ArrowDown', 's'], (pressed) =>
    setTimeout(() => (keys.current.backward = pressed), 100),
  )
  useKeypress(['ArrowLeft', 'a'], (pressed) =>
    setTimeout(() => (keys.current.left = pressed), 100),
  )
  useKeypress(['ArrowRight', 'd'], (pressed) =>
    setTimeout(() => (keys.current.right = pressed), 100),
  )

  return keys
}
