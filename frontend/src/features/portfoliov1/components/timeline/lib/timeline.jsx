import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Typography } from '@material-ui/core'
import { directions } from './enums/enums'

const useStyles = makeStyles(theme => {
	return {
		Timeline: {
			listStylePosition: 'inside',
			listStyleType: 'none',
			paddingRight: theme.spacing(2),
			paddingBottom: theme.spacing(8)
		},
		TimelineElement: {
			position: 'relative', /* so that pseudoelements are positioned relatively to their 'li's*/
			/* use padding-bottom instead of margin-bottom.*/
			marginBottom: '0', /* This overrides previously specified margin-bottom */
		},
		leftDirection: {
			direction: 'ltr'
		},
		rightDirection: {
			direction: 'rtl',
		},
		title: {
			width: '100%',
			color: 'black'
		}
	}
})

const generateNewProps = (props, direction) => {
	let newProps = {
		isOneWay: props.isOneWay,
		direction: direction,
	}

	if (props.stackedImages != null) {
		newProps = {
			...newProps,
			isStackedImage: props.stackedImages
		}
	}

	return newProps
}

const processExternalStyles = (props) => {
	if (props.style) {
		delete props.style.listStylePosition
		delete props.style.listStyleType
	}
}

const Timeline = (props) => {

	const classes = useStyles(props)
	processExternalStyles(props)

	const {
		title,
		htmlProps
	} = props

	const processedItems = React.Children.map(props.children, (item, index) => {
		let processedItem
		if (!props.isOneWay) {

			let isLeft
			if (props.isLeft) {
				isLeft = props.isLeft(item, index)
			}
			else {
				isLeft = index % 2 === 0
			}

			const newProps = generateNewProps(props, isLeft ? directions.RIGHT : directions.LEFT)
			processedItem = (
				<li className={isLeft ?
					[classes.leftDirection, classes.TimelineElement].join(' ') :
					[classes.rightDirection, classes.TimelineElement].join(' ')}>

					{React.cloneElement(item, newProps)}
				</li>

			)
		}
		else {

			let direction
			const isInvalidValidValue = !props.side || (props.side &&
				(props.side !== directions.LEFT && props.side !== directions.RIGHT))

			if (isInvalidValidValue) {
				direction = directions.LEFT
			}
			else {
				direction = props.side
			}
			const newProps = generateNewProps(props, direction)
			processedItem = (
				<li className={direction === directions.LEFT ? [classes.leftDirection, classes.TimelineElement].join(' ')
					: [classes.rightDirection, classes.TimelineElement].join(' ')}>
					{React.cloneElement(item, newProps)}
				</li>
			)
		}

		return props.wrapItem ? props.wrapItem(processedItem, index) : processedItem
	})
	return (
		<>
			<Typography variant={'h5'} className={classes.title} align='center'>
				{title}
			</Typography>
			<ul {...htmlProps} className={[classes.Timeline, props.className].join(' ')}>
				{processedItems}
			</ul>
		</>
	)

}

Timeline.propTypes = {
	isOneWay: PropTypes.bool,
	wrapItem: (item, index) => { },
	isLeft: (item, index) => { },
	stackedImages: PropTypes.bool,
}

export default Timeline
