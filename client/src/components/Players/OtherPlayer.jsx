/* eslint-disable react/prop-types */
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Person from './Person'
import React, { useEffect, useRef } from 'react'

export const lerp = (a, b, t) => (b - a) * t + a

export const Player = ({ position, playerId, rotation, anim }) => {
  const cubeRef = useRef()

  useFrame(() => {
    cubeRef.current.rotation.x = rotation.x
    cubeRef.current.rotation.y = rotation.y
    cubeRef.current.rotation.z = rotation.z

    cubeRef.current.position.x = lerp(
      cubeRef.current.position.x,
      position.x,
      0.2,
    )
    cubeRef.current.position.z = lerp(
      cubeRef.current.position.z,
      position.z,
      0.2,
    )
  })

  return (
    <mesh ref={cubeRef} position={[position.x, position.y - 0.5, position.z]}>
      <Person action={anim} scale={[0.25, 0.25, 0.25]} />
    </mesh>
  )
}

const OtherPlayer = ({ players }) => {
  useEffect(() => {
    console.log('Cubes mounted')
  })

  return (
    <group>
      {players.length > 0
        ? players?.map((player, index) => (
            <Player
              key={index}
              playerId={player.id}
              position={player.position}
              rotation={player.rotation}
              anim={player.animation.animation}
            />
          ))
        : null}
    </group>
  )
}

export default OtherPlayer
