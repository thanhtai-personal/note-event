import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { makeStyles } from '@material-ui/core/styles'
import gallery1 from 'root/assert/images/galerry/1.JPG'
import gallery2 from 'root/assert/images/galerry/2.jpg'
import gallery3 from 'root/assert/images/galerry/3.jpg'
import gallery6 from 'root/assert/images/galerry/6.jpg'
import gallery7 from 'root/assert/images/galerry/7.jpg'
import gallery8 from 'root/assert/images/galerry/8.jpg'
import gallery9 from 'root/assert/images/galerry/9.jpg'
import gallery11 from 'root/assert/images/galerry/11.jpg'
import gallery12 from 'root/assert/images/galerry/12.jpg'
import gallery13 from 'root/assert/images/galerry/13.JPG'
import gallery14 from 'root/assert/images/galerry/14.JPG'
import gallery15 from 'root/assert/images/galerry/15.JPG'
import gallery16 from 'root/assert/images/galerry/16.JPG'
import gallery17 from 'root/assert/images/galerry/17.JPG'
import gallery18 from 'root/assert/images/galerry/18.JPG'
import gallery19 from 'root/assert/images/galerry/19.JPG'
import gallery20 from 'root/assert/images/galerry/20.JPG'
import gallery21 from 'root/assert/images/galerry/21.JPG'
import gallery22 from 'root/assert/images/galerry/22.JPG'
import gallery23 from 'root/assert/images/galerry/22.JPG'
import gallery24 from 'root/assert/images/galerry/24.jpg'
import gallery25 from 'root/assert/images/galerry/25.jpg'
import gallery1thump from 'root/assert/images/galerry/thump1.jpg'
import gallery2thump from 'root/assert/images/galerry/thump2.jpg'
import gallery3thump from 'root/assert/images/galerry/thump3.jpg'
import gallery6thump from 'root/assert/images/galerry/thump6.jpg'
import gallery7thump from 'root/assert/images/galerry/thump7.jpg'
import gallery8thump from 'root/assert/images/galerry/thump8.jpg'
import gallery9thump from 'root/assert/images/galerry/thump9.jpg'
import gallery11thump from 'root/assert/images/galerry/thump11.jpg'
import gallery12thump from 'root/assert/images/galerry/thump12.jpg'
import gallery13thump from 'root/assert/images/galerry/thump13.jpg'
import gallery14thump from 'root/assert/images/galerry/thump14.jpg'
import gallery15thump from 'root/assert/images/galerry/thump15.jpg'
import gallery16thump from 'root/assert/images/galerry/thump16.jpg'
import gallery17thump from 'root/assert/images/galerry/thump17.jpg'
import gallery18thump from 'root/assert/images/galerry/thump18.jpg'
import gallery19thump from 'root/assert/images/galerry/thump19.jpg'
import gallery20thump from 'root/assert/images/galerry/thump20.jpg'
import gallery21thump from 'root/assert/images/galerry/thump21.jpg'
import gallery22thump from 'root/assert/images/galerry/thump22.jpg'
import gallery23thump from 'root/assert/images/galerry/thump22.jpg'
import gallery24thump from 'root/assert/images/galerry/thump24.jpg'
import gallery25thump from 'root/assert/images/galerry/thump25.jpg'

const images = [
  {
    original: gallery24,
    thumbnail: gallery24thump,
  },
  {
    original: gallery2,
    thumbnail: gallery2thump,
  },
  {
    original: gallery3,
    thumbnail: gallery3thump,
  },
  {
    original: gallery6,
    thumbnail: gallery6thump,
  },
  {
    original: gallery8,
    thumbnail: gallery8thump,
  },
  {
    original: gallery9,
    thumbnail: gallery9thump,
  },
  {
    original: gallery7,
    thumbnail: gallery7thump,
  },
  {
    original: gallery11,
    thumbnail: gallery11thump,
  },
  {
    original: gallery12,
    thumbnail: gallery12thump,
  },
  {
    original: gallery25,
    thumbnail: gallery25thump,
  },
  {
    original: gallery13,
    thumbnail: gallery13thump,
  },
  {
    original: gallery14,
    thumbnail: gallery14thump,
  },
  {
    original: gallery15,
    thumbnail: gallery15thump,
  },
  {
    original: gallery16,
    thumbnail: gallery16thump,
  },
  {
    original: gallery17,
    thumbnail: gallery17thump,
  },
  {
    original: gallery18,
    thumbnail: gallery18thump,
  },
  {
    original: gallery19,
    thumbnail: gallery19thump,
  },
  {
    original: gallery20,
    thumbnail: gallery20thump,
  },
  {
    original: gallery21,
    thumbnail: gallery21thump,
  },
  {
    original: gallery22,
    thumbnail: gallery22thump,
  },
  {
    original: gallery23,
    thumbnail: gallery23thump,
  },
  {
    original: gallery1,
    thumbnail: gallery1thump,
  },
]

const useStyles = makeStyles((theme) => ({
  imageGallery: {
    animation: `$imageAppear 1000ms ${theme.transitions.easing.easeInOut}`
  },
  '@keyframes imageAppear': {
    '0%': {
      opacity: 0,
      backgroundColor: 'transparent'
    },
    '100%': {
      opacity: 1
    }
  }
}))
 
const Gallery = (props) => {
  const classes = useStyles()
  return (
    <ImageGallery
      additionalClass={classes.imageGallery}
      items={images}
      lazyLoad
      slideDuration={2000}
      showThumbnails
      showIndex
    />
  )
}

export default Gallery