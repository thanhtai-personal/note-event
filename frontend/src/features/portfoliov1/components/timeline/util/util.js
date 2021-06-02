import React from 'react'
import TimelineItem from '../lib/timelineItem'
import { Typography, Chip } from '@material-ui/core'

export const createTimelineItem = (key, item, index, isDesktop) => {

    const timelineItemIcon = (
        <Typography variant={isDesktop ? 'h6' : 'body2'}>
            {item.date}
        </Typography>
    )

    let timelineItemHeader = null
    if (item.tags && isDesktop) {
        timelineItemHeader = item.tags.map((tag, index) => {
            return tag ?
                (<Chip
                    style={{
                        margin: '2px',
                        backgroundColor: '#00acc1'
                    }}
                    key={`${tag.key}-${index}`}
                    label={(<Typography style={{ color: 'white' }} variant='body2'>{tag.name}</Typography>)} />) :
                null
        })
    }

    const cardMediaProps = {
        imgUrl: item.imgUrl,
        height: '100px',
    }

    const timelineItemContent = (
        <React.Fragment>
            <Typography align='center' variant={isDesktop ? 'body1' : 'body2'}>{item.description}</Typography>
        </React.Fragment>
    )

    const timelineItem = (
        <TimelineItem
            titleChildren={(
                <Typography gutterBottom style={{
                    textAlign: 'center'
                }} variant={isDesktop ? 'h6' : 'body2'}>{item.title}</Typography>
            )}

            yearBackgroundColor='#00acc1'
            yearColor='white'
            cardContentChildren={timelineItemContent}
            cardHeaderChildren={timelineItemHeader}
            iconContent={timelineItemIcon}
            cardMediaProps={cardMediaProps}
            key={key}
            expandableCardContent
            padTop
            hasDivider />
    )
    return timelineItem

}