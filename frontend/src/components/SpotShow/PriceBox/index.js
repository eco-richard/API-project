import './PriceBox.css'

function PriceBox({ spot }) {
    return (
        <div className="price-box-wrapper">
            <div className="price-box-header">
                <div className="header-price">
                    <p id="price">{`$${spot.price}`}</p> <p id="text">night</p>
                </div>
            </div>
            <div className="fees-box-wrapper">
                <div className="stay-fee">
                    <div className="stay-calculation">
                        <p>{`$${spot.price} x 5 nights`}</p>
                    </div>
                    <div className="stay-total">
                        <p>{`$${spot.price * 5}`}</p>
                    </div>
                </div>
                <div className="cleaning-fee">
                    <div className="cleaning-text">
                        <p>Cleaning fee</p>
                    </div>
                    <div className="cleaning-price">
                        <p>$50</p>
                    </div>
                </div>
                <div className="service-fee">
                    <div className="service-text">
                        <p>Service fee</p>
                    </div>
                    <div className="service-price">
                        <p>$40</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="total-price-wrapper">
                <p id="total-before-taxes">Total before taxes</p>
                <p id="total-price">{`$${spot.price * 5 + 50 + 40}`}</p>
            </div>
        </div>
    )
}

export default PriceBox;