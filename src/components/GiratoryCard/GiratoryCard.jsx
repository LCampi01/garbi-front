import React from 'react'
import "./GiratoryCard.css"


const GiratoryCard = ({ frontComponent, backComponent, isFlipped }) => {
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className='front'>
                {frontComponent}
            </div>
            <div className='back'>
                {backComponent}
            </div>
        </div>
    )
}

export default GiratoryCard