// import Button from 'components/atoms/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from 'routes/routePath'
import './styles.scss'

function LandingPage() {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate(ROUTE.BUILD_CITY_PATH)
  }

  return (
    <div className="landing-page">
      <div className="landing-page__button" onClick={handleClick}>
        <span className="landing-page__button--inner">
          Build Your Dream City
        </span>
      </div>
    </div>
  )
}

export default LandingPage
