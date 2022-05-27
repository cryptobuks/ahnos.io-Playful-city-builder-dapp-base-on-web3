/* eslint-disable react/display-name */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Tree3 = forwardRef((props, buildingRef) => {
  const { nodes, materials } = useGLTF('/models/tree-3.glb')
  return (
    <group
      ref={buildingRef}
      scale={[0.25, 0.25, 0.25]}
      {...props}
      dispose={null}
    >
      <group position={[0, 1.37, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-3.82, 8.55, 0.25]} scale={1.06}>
          <group position={[3.79, -7.7, 0]}>
            <mesh
              geometry={nodes.Cylinder001_1.geometry}
              material={materials['Material.006']}
            />
            <mesh
              geometry={nodes.Cylinder001_2.geometry}
              material={materials['Material.005']}
            />
          </group>
        </group>
      </group>
    </group>
  )
})

export default Tree3
useGLTF.preload('/models/tree-3.glb')
