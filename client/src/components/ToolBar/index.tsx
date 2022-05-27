import React from 'react'
import moveIcon from 'assets/move-icon.svg'
import rotateIcon from 'assets/rotate-icon.svg'
import scaleIcon from 'assets/scale-icon.svg'
import settingIcon from 'assets/setting-icon.svg'
import trashBinIcon from 'assets/trash-bin-icon.svg'
import './styles.scss'

interface Props {
  changeToTranslateMode: () => {}
  changeToScaleMode: () => {}
  changeToRotateMode: () => {}
  deleteModel: () => {}
  currentTransformMode: string
}

const ToolBar: React.FC<Props> = ({
  changeToTranslateMode,
  changeToScaleMode,
  changeToRotateMode,
  deleteModel,
  currentTransformMode,
}) => {
  return (
    <div className="tools-bar">
      <div className="tools-bar__up">
        <div className="tools-bar__up__container">
          <div
            className={`circle-button ${
              currentTransformMode === 'translate' && 'circle-button--selected'
            }`}
            onClick={changeToTranslateMode}
          >
            <img
              className="circle-button__icon"
              src={moveIcon}
              alt="Move object icon"
            />
          </div>
          <div
            className={`circle-button ${
              currentTransformMode === 'scale' && 'circle-button--selected'
            }`}
            onClick={changeToScaleMode}
          >
            <img
              className="circle-button__icon"
              src={scaleIcon}
              alt="Scale object icon"
            />
          </div>
          <div
            className={`circle-button ${
              currentTransformMode === 'rotate' && 'circle-button--selected'
            }`}
            onClick={changeToRotateMode}
          >
            <img
              className="circle-button__icon"
              src={rotateIcon}
              alt="Rotate object icon"
            />
          </div>
          <div className="circle-button" onClick={deleteModel}>
            <img
              className="circle-button__icon"
              src={trashBinIcon}
              alt="Trash bin object icon"
            />
          </div>
        </div>
      </div>
      <div className="tools-bar__down">
        <div className="tools-bar__down__container">
          <div className="circle-button">
            <img
              className="circle-button__icon"
              src={settingIcon}
              alt="Setting icon"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolBar
