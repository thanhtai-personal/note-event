import React, { useCallback } from 'react'
import { Card, CardMedia, CardContent,
  Button,
  Body2, CardAction, CardHeader, Typography
} from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

const text = {
  read: 'Đọc truyện...'
}

const MediaCard = (props) => {

  const { data } = props

  const handleClickCard = useCallback(() => {
    console.log('click', data.url)
    window.open(data.url, '_blank')
  }, [data.url])

  return (
    <Card inset style={{ position: 'relative', height: '100%', cursor: 'pointer' }} rounded>
      <CardHeader
        style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', marginTop: '1em', textAlign: 'center', fontSize: '16px', fontWeight: 600 }}
        title={<Typography style={{marginTop: '1em', color: 'steelblue'}} textAlign='center'>{data.name}</Typography>}
      />
      <CardMedia
        dark
        src={data.imageUrl}
        style={{ background: `url(${data.imageUrl}) no-repeat center` }}
        // title={data.imageAltName}
      />
      <CardContent style={{ paddingBottom: '3em' }} >
        <Body2>
          {data.shortDescription}...
        </Body2>
      </CardContent>
      <CardAction style={{ background: 'orange', position: 'absolute', bottom: '1em' , width: '100%', justifyContent: 'center' }}>
        <Button style={{ background: 'steelblue', float: 'right', marginBottom: 0 }}
          onClick={handleClickCard}><Typography textAlign={'center'} style={{ color: 'white' }} variant={'b1'}>{text.read}</Typography></Button>
      </CardAction>
    </Card>
  )
}

export default MediaCard