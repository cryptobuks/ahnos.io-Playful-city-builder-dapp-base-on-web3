/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/ground-with-river.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane_1.geometry}
        material={materials['Material.001']}
      />
      <mesh
        geometry={nodes.Plane_2.geometry}
        material={materials['Material.002']}
      />
      <mesh
        geometry={nodes.Plane_3.geometry}
        material={materials['Material.005']}
      />
      <mesh
        geometry={nodes.Plane_4.geometry}
        material={materials['Material.004']}
      />
      <mesh
        geometry={nodes.Plane_5.geometry}
        material={materials['Material.003']}
      />
    </group>
  )
}

useGLTF.preload('/models/ground-with-river.glb')
