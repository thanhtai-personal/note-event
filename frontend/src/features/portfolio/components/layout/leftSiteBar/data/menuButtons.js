import {
  HomeOutlined,
  AccountBoxOutlined,
  SettingsOutlined,
  VisibilityOutlined,
  MailOutlined
} from '@material-ui/icons';

const menuButtons = [
  {
    key: 'home',
    iconElement: <HomeOutlined />,
    iconClassName: '',
    rel: 'index',
    labelText: 'Home',
    active: true
  },
  {
    key: 'about',
    iconElement: <AccountBoxOutlined />,
    iconClassName: '',
    rel: 'about',
    labelText: 'About',
    active: false
  },
  {
    key: 'skills',
    iconElement: <SettingsOutlined/>,
    iconClassName: '',
    rel: 'skills',
    labelText: 'Skills',
    active: false
  },
  {
    key: 'gallery',
    iconElement: <VisibilityOutlined />,
    iconClassName: '',
    rel: 'gallery',
    labelText: 'Gallery',
    active: false
  },
  {
    key: 'contact',
    iconElement: <MailOutlined />,
    iconClassName: '',
    rel: 'contact',
    labelText: 'Contact',
    active: false
  }
]

export default menuButtons