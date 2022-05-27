/* eslint-disable react/display-name */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Tree2 = forwardRef((props, buildingRef) => {
  const { nodes, materials } = useGLTF('/models/tree-2.glb')
  return (
    <group
      ref={buildingRef}
      scale={[0.25, 0.25, 0.25]}
      {...props}
      dispose={null}
    >
      <group position={[0, 1.37, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-3.7, -14.5, 12.63]} scale={[1.69, 1.42, 1.69]}>
          <group position={[2.32, 10.42, 0]}>
            <mesh
              geometry={nodes.Plane002_1.geometry}
              material={materials['Material.006']}
            />
            <mesh
              geometry={nodes.Plane002_2.geometry}
              material={materials['Material.005']}
            />
          </group>
        </group>
      </group>
    </group>
  )
})
export default Tree2

useGLTF.preload('/models/tree-2.glb')