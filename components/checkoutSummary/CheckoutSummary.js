import React from 'react';
import CheckoutItem from '../checkoutItem/CheckoutItem';

export default function CheckoutSummary() {
    return (
        <div className='checkout-summary-cont'>
            <div className='purchase-summary'>
                <div className='edit-option-cont'>
                    <h3>Summary</h3>
                    <a>edit</a>
                </div>
                <CheckoutItem />
            </div>
            <div className='cost-summary'>
                
            </div>
        </div>
    )
}
