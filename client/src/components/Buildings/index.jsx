/* eslint-disable react/prop-types */
import { TransformControls } from '@react-three/drei'
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from '@react-three/postprocessing'
import React, { lazy, Suspense, useRef } from 'react'
import { selectModel, updateModel } from 'redux/model.slice'

// import Building1 from './Building-1'

const Building1 = lazy(() => import('./Building-1'))
const Building2 = lazy(() => import('./Building-2'))
const Building3 = lazy(() => import('./Building-3'))
const Building4 = lazy(() => import('./Building-4'))
const Building5 = lazy(() => import('./Building-5'))

const Tree2 = lazy(() => import('components/Trees/Tree-2'))
const Tree3 = lazy(() => import('components/Trees/Tree-3'))
const Tree4 = lazy(() => import('components/Trees/Tree-4'))

const Rock1 = lazy(() => import('components/Rocks/Rock-1'))
const Rock2 = lazy(() => import('components/Rocks/Rock-2'))
const Rock3 = lazy(() => import('components/Rocks/Rock-3'))
const Rock4 = lazy(() => import('components/Rocks/Rock-4'))

const GroundWithBarrier = lazy(() =>
  import('components/Grounds/Ground-with-barrier'),
)
const GroundWithRivier = lazy(() =>
  import('components/Grounds/Ground-with-river'),
)

const Fansipan = lazy(() => import('components/Buildings/Fansipan'))
const Bitexco = lazy(() => import('components/Buildings/Bitexco'))
const Lake = lazy(() => import('components/Buildings/Lake'))

const Building = ({
  building,
  isSelected = false,
  id,
  position,
  rotation,
  scale,
  dispatch = () => {},
  transformMode,
}) => {
  const selected = isSelected
  const buildingRef = useRef()
  const prevPostion = position
  const prevRotation = rotation
  const prevScale = scale

  const handleUpdateModel = (object) => {
    const { position, rotation, scale } = object
    if (
      position.x !== prevPostion.x ||
      position.y !== prevPostion.y ||
      position.z !== prevPostion.z ||
      rotation.x !== prevRotation.x ||
      rotation.y !== prevRotation.y ||
      rotation.z !== prevRotation.z ||
      scale.x !== prevScale.x ||
      scale.y !== prevScale.y ||
      scale.z !== prevScale.z
    )
      dispatch(
        updateModel({
          id,
          position: { x: position.x, y: position.y, z: position.z },
          rotation: { x: rotation.x, y: rotation.y, z: rotation.z },
          scale: { x: scale.x, y: scale.y, z: scale.z },
        }),
      )
  }

  const handleModelClick = () => {
    if (!isSelected) dispatch(selectModel(id))
  }

  return (
    <Suspense fallback={null}>
      <TransformControls
        mode={transformMode}
        onMouseUp={(e) => handleUpdateModel(e.target.object)}
        enabled={selected}
        showX={selected}
        showY={selected}
        showZ={selected}
        position={[prevPostion.x, prevPostion.y, prevPostion.z]}
        // rotation={[rotation.x, rotation.y, rotation.z]}
        // scale={[scale.x, scale.y, scale.z]}
      >
        <Selection>
          <EffectComposer autoClear={false} multisampling={8}>
            <Outline blur hiddenEdgeColor={80} edgeStrength={100} />
          </EffectComposer>
          <Select enabled={selected}>
            {
              {
                TEST_MODEL_1: (
                  <Building1
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_2: (
                  <Building2
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_3: (
                  <Building3
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_4: (
                  <Building4
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_5: (
                  <Building5
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_TREE_2: (
                  <Tree2
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                    receiveShadow
                  />
                ),
                TEST_MODEL_TREE_3: (
                  <Tree3
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                    receiveShadow
                  />
                ),
                TEST_MODEL_TREE_4: (
                  <Tree4
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                    receiveShadow
                  />
                ),
                TEST_MODEL_ROCK_1: (
                  <Rock1
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_ROCK_2: (
                  <Rock2
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_ROCK_3: (
                  <Rock3
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_ROCK_4: (
                  <Rock4
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_BUILDING_1: (
                  <Bitexco
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                TEST_MODEL_LAKE_1: (
                  <Lake key={id} ref={buildingRef} onClick={handleModelClick} />
                ),
                TEST_MODEL_MOUNTAIN_1: (
                  <Fansipan
                    key={id}
                    ref={buildingRef}
                    onClick={handleModelClick}
                  />
                ),
                // TEST_MODEL_GROUND_1: (
                //   <GroundWithBarrier />
                // ),
                // TEST_MODEL_GROUND_2: (
                //   <GroundWithRivier />
                // )
              }[building]
            }
          </Select>
        </Selection>
      </TransformControls>
    </Suspense>
  )
}

export default Building
