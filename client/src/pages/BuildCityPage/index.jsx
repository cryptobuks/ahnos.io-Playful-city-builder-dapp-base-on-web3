import {
  ContactShadows,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
} from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import Building from 'components/Buildings'
import Ground from 'components/Grounds/Ground-with-river'
import ToolBar from 'components/ToolBar'
import ShopPage from 'pages/ShopPage'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addModel,
  cancelSelectedModel,
  changeModel,
  deleteModel,
} from 'redux/model.slice'
import { changeTool } from 'redux/toolbar.slice'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import {
  BUILDING_MODELS,
  DECORATION_MODELS,
  EFFECT_MODELS,
} from 'utils/constants'
import './styles.scss'
import { create } from 'ipfs-http-client'
import { useConnectedWallet } from '@saberhq/use-solana'
import { actions } from '@metaplex/js'
import { stringifyPubkeysAndBNsInObject } from 'utils/helpers'
import { Connection, clusterApiUrl } from '@solana/web3.js'
import { updateFileUrl, updateImageUrl } from 'redux/mint.slice'
import { useNavigate } from 'react-router-dom'

extend({ GLTFExporter })

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' })
const exporter = new GLTFExporter()

function BuildCityPage() {
  const models = useSelector((state) => state.model.models)
  const selectedModel = useSelector((state) => state.model.selectedModel)
  const transformMode = useSelector((state) => state.toolbar.currentTool)
  const dispatch = useDispatch()
  const [modelSelectPreview, setModelSelectPreview] = useState()
  const [showShopModal, setShowShopModal] = useState(false)
  const [canvas, setCanvas] = useState()

  const wallet = useConnectedWallet()
  const [fileUrl, setFileUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [metadataUrl, setMetadataUrl] = useState('')
  const [metadata, setMetadata] = useState()
  const navigate = useNavigate()

  const tabs = [
    {
      id: 'BUILDING',
      title: 'Building',
      isSelected: false,
    },
    {
      id: 'DECORATION',
      title: 'Decoration',
      isSelected: false,
    },
    {
      id: 'EFFECT',
      title: 'Effect',
      isSelected: false,
    },
  ]
  const [currentTab, setCurrentTab] = useState(tabs[0])
  // const modelList = [
  //   BUILDING_MODELS, DECORATION_MODELS
  // ]
  const [currentModelList, setCurrentModelList] = useState(BUILDING_MODELS)

  // HANDLE KEY EVENT
  useEffect(() => {
    console.log('rerender')
    document.addEventListener('keydown', handleEscButtonPress, false)
    document.addEventListener('keydown', handleDelButtonPress, false)

    return () => {
      document.removeEventListener('keydown', handleEscButtonPress, false)
      document.removeEventListener('keydown', handleDelButtonPress, false)
    }
  }, [])

  // HANDLE CREATE USER
  useEffect(() => {
    if (wallet) {
      fetch('http://localhost:3501/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: wallet?.publicKey?.toString(),
          models: [],
        }),
      })
    }
  }, [wallet])

  const handleEscButtonPress = (event) =>
    event.key === 'Escape' && dispatch(cancelSelectedModel())

  const handleDelButtonPress = (event) =>
    event.keyCode === 46 && dispatch(deleteModel())

  const handleAdd3DBuildingModel = (name) => {
    if (!selectedModel) {
      dispatch(addModel({ name }))
    } else {
      dispatch(changeModel({ name }))
    }
  }

  const handleModelSelectPreview = (modelId) => {
    setModelSelectPreview(modelId)
    handleAdd3DBuildingModel(modelId)
  }

  const uploadImage = async () => {
    canvas.gl.domElement.toBlob(
      async (blob) => {
        try {
          const added = await ipfs.add(blob)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log(added)
          setImageUrl(url)
          // dispatch(updateImageUrl(url))
        } catch (error) {
          console.log('Error uploading file: ', error)
        }
      },
      'image/png',
      1.0,
    )
  }

  const callback = async (blob) => {
    try {
      const added = await ipfs.add(blob)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setImageUrl(url)
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
      return ''
    }
  }

  const uploadFile = () => {
    let canvasClone = canvas.scene.clone()
    canvasClone.children.forEach((child, index) => {
      if (child.type === 'AmbientLight') {
        canvasClone.children.splice(index, 1)
      }
      if (child.type === 'Object3D') {
        canvasClone.children.splice(index, 1)
      }
    })

    exporter.parse(
      canvasClone,
      async (gltf) => {
        let file

        if (gltf instanceof ArrayBuffer) {
          file = new Blob([gltf], { type: 'application/octet-stream' })
        } else {
          const output = JSON.stringify(gltf)
          file = new Blob([output], { type: 'text/plain' })
        }

        try {
          const added = await ipfs.add(file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          setFileUrl(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }
      },
      (error) => {
        console.log('An error happened: ', error.message)
      },
    )
  }

  const publishAndInvite = () => {
    navigate(`/city/${wallet?.publicKey?.toString()}`)
  }

  const saveCity = () => {
    fetch('http://localhost:3501/api/update-user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: wallet?.publicKey?.toString(),
        models: models,
      }),
    })
  }

  const genMetadata = (image, glb) => {
    return {
      name: 'sonha',
      symbol: 'AHNOSSSSS',
      description: 'description',
      seller_fee_basis_points: 0,
      image: image,
      animation_url: glb,
      external_url: 'https://sonha.space',
      properties: {
        category: 'vr',
        files: [
          {
            uri: image,
            type: 'image/png',
          },
          {
            uri: glb,
            type: 'vr/glb',
          },
        ],
        creators: [
          {
            address: wallet?.publicKey?.toString(),
            share: 100,
          },
        ],
      },
    }
  }
  const uploadMetadata = async () => {
    const metadata = genMetadata(
      'https://ipfs.infura.io/ipfs/QmZtSp2omiNpmjCxBuweok4RSQDEtrMghXscgm6c69acZ8',
      'https://ipfs.infura.io/ipfs/QmTbQtmxvpzgzA9gjZGQ7Qx6dJs1YxLEqdSwtzXDo9XRGY',
    )
    const jsonse = JSON.stringify(metadata)
    console.log('jsonse: ', jsonse)
    const fileMetadata = new Blob([jsonse], { type: 'application/json' })
    try {
      const added = await ipfs.add(fileMetadata)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setMetadataUrl(url)
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
      return ''
    }
  }

  const handleMint = async (wallet, uri, maxSupply) => {
    let connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    // const uri = metadataUrl

    const result = await actions.mintNFT({
      connection,
      wallet,
      uri,
      maxSupply,
    })
    const strResult = stringifyPubkeysAndBNsInObject(result)
    console.log('Minted a new master NFT:', strResult)
    return strResult
  }

  const handleMintCity = async () => {
    // await uploadImage()
    // await uploadFile()
    const metadataUrl = await uploadMetadata()
    console.log('::metadataUrl', metadataUrl)
    await handleMint(wallet, metadataUrl, 0)
  }

  const handleOnCreated = (e) => {
    setCanvas(e)
  }

  const handleChangeTab = (tab) => {
    setCurrentTab(tab)
    if (tab.id === 'BUILDING') setCurrentModelList(BUILDING_MODELS)
    if (tab.id === 'DECORATION') setCurrentModelList(DECORATION_MODELS)
    if (tab.id === 'EFFECT') setCurrentModelList(EFFECT_MODELS)
  }

  return (
    <div className="build-city-page">
      <div className="model-selector-panel">
        <div className="model-selector-panel__container">
          <div className="model-selector-panel__container__tabs">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`model-selector-panel__container__tabs__title ${
                  tab.id === currentTab.id ? 'tab__title--selected' : ''
                }`}
                onClick={() => handleChangeTab(tab)}
              >
                <span className="model-selector-panel__container__tabs__title--inner">
                  {tab.title}
                </span>
              </div>
            ))}
          </div>

          <div className="model-selector-panel__container__model-list">
            <div className="model-selector-panel__container__model-list__container">
              {currentModelList.length &&
                currentModelList.map((model) => (
                  <div
                    key={model.modelId}
                    className={`model-card ${
                      model.modelId === modelSelectPreview
                        ? 'model-card--selected'
                        : ''
                    }`}
                    onClick={() => handleModelSelectPreview(model.modelId)}
                    style={{
                      backgroundImage: `url(${model.imagePath})`,
                    }}
                  >
                    <div className="model-card__overlay">
                      <div className="model-card__overlay__name">
                        <span className="model-card__overlay__name--inner">
                          {model.modelName}
                        </span>
                      </div>

                      <div className="model-card__overlay__rarity">
                        <span className="model-card__overlay__rarity--inner">
                          Rarity: {model.rarity}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="model-selector-panel__container__cta">
            <div
              className="model-selector-panel__container__cta__container"
              onClick={() => setShowShopModal(true)}
            >
              <span className="model-selector-panel__container__cta__container--inner">
                More Building
              </span>
            </div>
          </div>
        </div>
      </div>

      <ToolBar
        changeToTranslateMode={() => dispatch(changeTool('translate'))}
        changeToScaleMode={() => dispatch(changeTool('scale'))}
        changeToRotateMode={() => dispatch(changeTool('rotate'))}
        deleteModel={() => dispatch(deleteModel())}
        currentTransformMode={transformMode}
      />

      <div className="actions-bar">
        <div className="actions-bar__container">
          <div className="actions-bar__container__button" onClick={saveCity}>
            <span className="actions-bar__container__button--inner">Save</span>
          </div>
          <div
            className="actions-bar__container__button"
            onClick={handleMintCity}
          >
            <span className="actions-bar__container__button--inner">
              Mint City
            </span>
          </div>
          <div
            className="actions-bar__container__button actions-bar__button-cta"
            onClick={publishAndInvite}
          >
            <span className="actions-bar__container__button--inner ">
              Publish & Invite friend
            </span>
          </div>
          <div className="actions-bar__container__avatar">
            <div className="actions-bar__container__avatar--inner"></div>
          </div>
        </div>
      </div>

      {showShopModal && <ShopPage closeModal={() => setShowShopModal(false)} />}

      <div className="build-city-page__canvas">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 20, position: [-50, 25, 50] }}
          className="build-city-page__canvas__container"
          onCreated={handleOnCreated}
          gl={{ preserveDrawingBuffer: true }}
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

          {imageUrl && console.log('imageUrl: ', imageUrl)}
          {fileUrl && console.log('fileUrl: ', fileUrl)}
          {metadataUrl && console.log('metadataUrl: ', metadataUrl)}

          <Suspense fallback={null}>
            {models?.map((model) => (
              <Building
                key={model.id}
                position={model.position}
                rotation={model.rotation}
                scale={model.scale}
                id={model.id}
                dispatch={dispatch}
                building={model.name}
                transformMode={transformMode}
                isSelected={model.id === selectedModel}
              />
            ))}

            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport
                axisColors={['hotpink', 'aquamarine', '#3498DB']}
                labelColor="black"
              />
            </GizmoHelper>
            <Ground receiveShadow />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default BuildCityPage
