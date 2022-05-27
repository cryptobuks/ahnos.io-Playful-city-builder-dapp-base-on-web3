import React, { Suspense, useEffect, useState } from 'react'
import * as Colyseus from 'colyseus.js'
import { Canvas } from '@react-three/fiber'
import OtherPlayer from 'components/Players/OtherPlayer'
import MainPlayer from 'components/Players/MainPlayer'
import './styles.scss'
import { OrbitControls } from '@react-three/drei'
import { useParams } from 'react-router-dom'
import Building from 'components/Buildings'
import Ground from 'components/Grounds/Ground-with-river'

function ShareCityPage() {
  const [room, setRoom] = useState(null)
  const [client, setClient] = useState(null)
  const [mainPlayer, setMainPlayer] = useState(null)
  const [players, setPlayers] = useState([])
  const { address } = useParams()
  const [models, setModels] = useState()

  // GET MODELS FROM DB
  useEffect(() => {
    if (address) {
      fetch(`http:///localhost:3501/api/get-user/${address}`)
        .then((res) => res.json())
        .then((user) => setModels(user.models))
    }
  }, [address])

  useEffect(() => {
    const client = new Colyseus.Client('ws://localhost:2567')
    setClient(client)
  }, [])

  useEffect(() => {
    const doThing = async () => {
      const name = `${new Date().getTime()}`
      const playerList = []
      if (client) {
        try {
          const room = await client.joinOrCreate('my_room', { name: name })
          console.log('Joined room')
          room.state.players.onAdd = (player, sessionId) => {
            console.log('sessionId: ', sessionId)
            if (sessionId === room.sessionId) {
              console.log(sessionId, 'main player joined!')
              setMainPlayer(player)
            } else {
              console.log(sessionId, 'joined!')
              playerList.push(player)
              setPlayers((state) => [...state, player])
            }
          }

          room.state.players.onRemove = (player, sessionId) => {
            const removedPlayerIndex = playerList.findIndex(
              (player) => player.id === sessionId,
            )
            playerList.splice(removedPlayerIndex, 1)
            console.log(sessionId, ' leave')
            setPlayers(playerList)
          }

          setRoom(room)
        } catch (e) {
          console.error('Join error: ', e)
        }
      }
    }

    doThing()
  }, [client])

  return (
    <div className="share-city-page">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 20, position: [-20, 10, 20] }}
        className="share-city-page__canvas"
      >
        <OrbitControls makeDefault />

        <ambientLight intensity={0.75} />

        <hemisphereLight
          color="#ffffff"
          groundColor="#b9b9b9"
          position={[-7, 25, 13]}
          intensity={0.85}
        />

        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense>
          {models?.map((model) => (
            <Building
              key={model.id}
              position={model.position}
              rotation={model.rotation}
              scale={model.scale}
              id={model.id}
              // dispatch={dispatch}
              building={model.name}
              // transformMode={transformMode}
              // isSelected={model.id === selectedModel}
            />
          ))}

          {players.length > 0 ? (
            <OtherPlayer
              mainPlayerId={mainPlayer?.id || '123'}
              room={room}
              players={players}
            />
          ) : null}
          {mainPlayer && (
            <MainPlayer
              room={room}
              mainPlayer={mainPlayer}
              position={[
                mainPlayer?.position.x,
                mainPlayer?.position.y - 0.5,
                mainPlayer?.position.z,
              ]}
              rotation={[
                mainPlayer?.rotation.x,
                mainPlayer?.rotation.y,
                mainPlayer?.rotation.z,
              ]}
              name={mainPlayer?.id}
              anim={mainPlayer?.animation.animation}
            />
          )}

          <Ground receiveShadow />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ShareCityPage
