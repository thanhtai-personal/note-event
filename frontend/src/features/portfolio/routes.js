import PortfolioContainer from './containers/portfolio'
import GridImageContainer from './containers/gridImage'
import { hocKeys } from './utils'
import useLeftSideBar from './hocs/useLeftSideBar'
import setUpFeature from './setup'
import unsetFeature from './unset'

const portfolioRoutes = [
  {
    key: 'gridImage',
    path: '/grid-image',
    isExact: true,
    component: GridImageContainer,
    hocs: [],
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  },
  {
    key: 'profilev2',
    path: '/profile',
    isExact: true,
    component: PortfolioContainer,
    hocs: [
      { 
        key: hocKeys.useLeftSideBar,
        componentHoc: useLeftSideBar
      }
    ],
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  }
]

export default portfolioRoutes