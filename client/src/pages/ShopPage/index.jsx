/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './styles.scss'
import closeIcon from 'assets/close-icon.svg'
import solanaIcon from 'assets/solana-icon.svg'
import {
  SHOP_BUILDING_MODELS,
  SHOP_DECORATION_MODELS,
  SHOP_EFFECT_MODELS,
} from 'utils/constants'

function ShopPage({ closeModal }) {
  const tabs = [
    {
      id: 'BUILDING',
      title: 'Building',
    },
    {
      id: 'DECORATION',
      title: 'Decoration',
    },
    {
      id: 'EFFECT',
      title: 'Effect',
    },
  ]
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [currentModelList, setCurrentModelList] = useState(SHOP_BUILDING_MODELS)
  const [currentModelSelected, setCurrentModelSelected] = useState(
    SHOP_BUILDING_MODELS[0],
  )

  const handleChangeTab = (tab) => {
    setCurrentTab(tab)
    if (tab.id === 'BUILDING') setCurrentModelList(SHOP_BUILDING_MODELS)
    if (tab.id === 'DECORATION') setCurrentModelList(SHOP_DECORATION_MODELS)
    if (tab.id === 'EFFECT') setCurrentModelList(SHOP_EFFECT_MODELS)
  }

  const handleChangeModelSelected = (model) => {
    setCurrentModelSelected(model)
  }

  return (
    <div className="shop-page">
      <div className="shop-modal">
        <div className="shop-modal__overlay"></div>
        <div className="shop-modal__container">
          <div
            className="shop-modal__container__close-button"
            onClick={closeModal}
          >
            <img src={closeIcon} alt="Close modal icon" />
          </div>
          <div className="shop-modal__container__tabs">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`shop-modal__container__tabs__title ${
                  tab.id === currentTab.id ? 'tab__title--selected' : ''
                }`}
                onClick={() => handleChangeTab(tab)}
              >
                <span className="shop-modal__container__tabs__title--inner">
                  {tab.title}
                </span>
              </div>
            ))}
          </div>
          <div className="shop-modal__container__shopping">
            <div className="shop-modal__container__shopping__details">
              <div
                className="shop-modal__container__shopping__details__image"
                style={{
                  backgroundImage: `url(${currentModelSelected.imagePath})`,
                }}
              ></div>
              <div className="shop-modal__container__shopping__details__name">
                <span className="shop-modal__container__shopping__details__name--inner">
                  {currentModelSelected.modelName}
                </span>
              </div>

              <div className="shop-modal__container__shopping__details__info-container">
                <div className="shop-modal__container__shopping__details__info-container__description">
                  <span className="shop-modal__container__shopping__details__info-container__description--inner">
                    {currentModelSelected.describe}
                  </span>
                </div>
                <div className="shop-modal__container__shopping__details__info-container__rarity">
                  <span className="shop-modal__container__shopping__details__info-container__rarity--inner">
                    Rarity: {currentModelSelected.rarity}%
                  </span>
                </div>
              </div>

              <div className="shop-modal__container__shopping__details__price">
                <img
                  className="shop-modal__container__shopping__details__price__cyptocurrency-logo"
                  src={solanaIcon}
                  alt=""
                />
                <span className="shop-modal__container__shopping__details__price__text">
                  {currentModelSelected.price}
                </span>
              </div>
              <div className="shop-modal__container__shopping__details__buy-now">
                <span className="shop-modal__container__shopping__details__buy-now--inner">
                  Buy now
                </span>
              </div>
            </div>

            <div className="shop-modal__container__shopping__previews">
              {currentModelList.length
                ? currentModelList.map((model) => (
                    <div
                      key={model.modelId}
                      className={`model-preview-card ${
                        currentModelSelected.modelId === model.modelId
                          ? 'model-preview-card--selected'
                          : ''
                      }`}
                      onClick={() => handleChangeModelSelected(model)}
                    >
                      <div
                        className="model-preview-card__image"
                        style={{ backgroundImage: `url(${model.imagePath})` }}
                      ></div>
                      <div className="model-preview-card__name">
                        <span className="model-preview-card__name--inner">
                          {model.modelName}
                        </span>
                      </div>
                      <div className="model-preview-card__price">
                        <img
                          className="model-preview-card__price__cyptocurrency-logo"
                          src={solanaIcon}
                          alt=""
                        />
                        <span className="model-preview-card__price__text">
                          {model.price}
                        </span>
                      </div>
                      <div className="model-preview-card__rarity">
                        <span className="model-preview-card__rarity--inner">
                          Rarity: {model.rarity}%
                        </span>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="shop-modal__container__timer">
            <span className="shop-modal__container__timer--inner">
              12:00 left to reset store
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
