import React from 'react';
import './Counter.scss';

const rce = React.createElement;

// TODO check to see if pass by reference or value? may need to switch onClicks for a callback
// TODO longpress allow them to add or decrement a specific amount

/* props
* quantity
* setQuantity
* step
* min
* max
*/
function Counter(props) {
	return rce('div', {className: 'counter'}, 
		rce('div', {
				className: 'decrement-button',
				onClick: () => {props.setQuantity(props.quantity - props.step)}
			}
		),
		rce('input', {
				className: 'quantity',
				type: 'number',
				value: props.quantity,
				onChange: (e) => props.setQuantity(e.target.value),
				min: props.min,
				max: props.max
			}
		),
		rce('div', {
				className: 'increment-button',
				onClick: () => {props.setQuantity(props.quantity + props.step)}
			}
		)
	)
}

export default Counter;