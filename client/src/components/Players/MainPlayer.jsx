/* eslint-disable react/prop-types */
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'hooks/useControls'
import React, { useEffect, useRef, useState } from 'react'
import Person from './Person'

const MainPlayer = ({ room, position, rotation, name, anim }) => {
  const mainPlayerRef = useRef()
  const controls = useControls()
  const [action, setAction] = useState('Idle')

  useEffect(() => {
    console.log('Main player mount: ', anim)
  })

  useFrame(() => {
    const { forward, backward, left, right } = controls.current

    if (forward) {
      mainPlayerRef.current.rotation.y = Math.PI / 2
      mainPlayerRef.current.position.x += 0.05
      setAction('Run')
    }
    if (backward) {
      mainPlayerRef.current.rotation.y = -(Math.PI / 2)
      mainPlayerRef.current.position.x -= 0.05
      setAction('Run')
    }
    if (left) {
      mainPlayerRef.current.rotation.y = Math.PI
      mainPlayerRef.current.position.z -= 0.05
      setAction('Run')
    }
    if (right) {
      mainPlayerRef.current.rotation.y = 0
      mainPlayerRef.current.position.z += 0.05
      setAction('Run')
    }

    if (forward || backward || left || right) {
      room.send('move', {
        position: {
          x: mainPlayerRef.current.position.x,
          y: mainPlayerRef.current.position.y,
          z: mainPlayerRef.current.position.z,
        },
        rotation: {
          x: mainPlayerRef.current.rotation.x,
          y: mainPlayerRef.current.rotation.y,
          z: mainPlayerRef.current.rotation.z,
        },
      })
      room.send('anim', {
        animation: 'Run',
      })
    }

    if (!forward && !backward && !left && !right) {
      setAction('Idle')
    }
  })

  return (
    <mesh ref={mainPlayerRef} position={position} rotation={rotation}>
      <Person action={action} scale={[0.25, 0.25, 0.25]} />
    </mesh>
  )
}

export default MainPlayer
