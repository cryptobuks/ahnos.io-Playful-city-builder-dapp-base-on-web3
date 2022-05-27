/* eslint-disable react/display-name */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Rock1 = forwardRef((props, buildingRef) => {
  const { nodes, materials } = useGLTF('/models/rock-1.glb')
  return (
    <group ref={buildingRef} scale={[0.2, 0.2, 0.2]} {...props} dispose={null}>
      <group
        position={[0.09, 0, -0.03]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.05}
      >
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.initialShadingGroup}
        />
      </group>
    </group>
  )
})

export default Rock1

useGLTF.preload('/models/rock-1.glb')