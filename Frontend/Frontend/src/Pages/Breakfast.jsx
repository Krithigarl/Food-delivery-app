import React from 'react'
import { Link } from 'react-router'

const Breakfast = () => {
    return (
        <div>
            <nav className='navbar12'>
                <p className='text brand'><span className='arrow_icon'><Link to="/"><i className="uil uil-arrow-left"></i></Link></span>Breakfast recipe's <span className='cart_icon'><Link to='addtocart'><i className="uil uil-shopping-cart-alt"></i></Link></span></p>
            </nav>
              <div className="Break-bgimage">
                <h1>Fresh Breakfast, Happy Morning!</h1>
              </div>
        </div>
    )
}

export default Breakfast