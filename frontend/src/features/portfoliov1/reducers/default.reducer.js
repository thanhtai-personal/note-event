
import Utils from 'root/utils'
import {
  DEFAULT_ACTION,
} from '../actions/types'
import bannerImage from 'root/assert/images/mini-profile-bg-01.jpg'
import kolabsLogo from 'root/assert/images/kolabs-logo.jpg'
import titanLogo from 'root/assert/images/titan_techno.jpg'
import citynowLogo from 'root/assert/images/citynowLogo.jpg'
import gameLoftLogo from 'root/assert/images/gameloftLogo.png'
import fujinetLogo from 'root/assert/images/fujinetlogo.png'
import natureScienceLogo from 'root/assert/images/hcmusLogo.png'
import profileImageDefault from 'root/assert/images/profileImage.jpeg'
import { iconKeys } from 'root/commonComponents/materialUIIcons'

const initalState = {
  bannerData: {
    title: 'Trần Thanh Tài',
    subTitle: 'ReactJS - Web developer',
    description: 'Hello someone, so very happy to have you here to visit my site.',
    image: bannerImage,
  },
  profileData: {
    image: profileImageDefault,
    imageText: 'profile image',
    sortDescription: ` am a highly motivated full-stack web developer who loves to write a scalable code and research to do it, and always try to create apps with more and more comfortable for the user. Ambitious and looking forward to work with people who also loves coding and make users happy.`,
    informations: [
      {
        key: 'birthDay',
        name: 'Birthdate',
        value: '05/06/1993'
      },
      {
        key: 'phone',
        name: 'Phone',
        value: '0972828264'
      },
      {
        key: 'email',
        name: 'Email',
        value: 'thanhtai.tttgalaxy@gmail.com'
      },
      {
        key: 'address',
        name: 'Address',
        value: 'Tan Thoi Hiep, 12 district, Ho Chi Minh city, Viet Nam'
      },
      {
        key: 'profile',
        name: 'Profile',
        value: 'https://tttgalaxy.co.uk/profile',
        type: 'link'
      },
      {
        key: 'blog',
        name: 'Blog',
        value: 'https://tttgalaxy.co.uk/blogger',
        type: 'link'
      },
      {
        key: 'LinkedIn',
        name: 'Linkedin',
        value: 'https://www.linkedin.com/in/tran-thanh-tai-539250129/',
        type: 'link'
      },
      {
        key: 'git',
        name: 'Github',
        value: 'https://github.com/thanhtai-personal',
        type: 'link'
      },
      {
        key: 'npm',
        name: 'NPM',
        value: 'https://www.npmjs.com/~demonking',
        type: 'link'
      }
    ]
  },
  projects: [
    {
      name: 'TankVN',
      url: 'https://www.youtube.com/watch?v=LwJa69CBARk',
      type: 'Game',
      language: 'Microsoft XNA 4.0',
      description: 'A classical video game - Battle city',
      company: 'Ho Chi Minh City University of Science'
    },
    {
      name: 'Online Shop',
      url: 'https://www.youtube.com/watch?v=QkPch76obeM',
      type: 'Web App',
      language: 'ASP.net MVC 4 - LINQ database',
      description: 'A commercial website - shopping online',
      company: 'Gameloft company'
    },
    {
      name: 'Pro Evolution Soccer 2015',
      url: '#',
      type: 'Game',
      language: 'java/c++',
      description: 'A sport game',
      company: 'Gameloft company'
    },
    {
      name: 'Delorean',
      url: '#',
      type: 'ERP outsourcing',
      language: 'Scala & ReactJS',
      description: 'ERP',
      company: 'CityNow company'
    },
    {
      name: 'Swallow',
      url: 'http://citynow.vn/citynowsa',
      type: 'Web Product',
      language: 'Scala & ReactJS',
      description: 'Vietnam-Japan job brokerage',
      company: 'CityNow company'
    },
    {
      name: 'Maestro',
      url: '#',
      type: 'Web',
      language: '.Net & ReactJS',
      description: 'Event organization and management for celebrities.',
      company: 'KoLabs company'
    },
    {
      name: 'WorkID',
      url: '#',
      type: 'Web',
      language: '.Net & ReactJS',
      description: 'Finding user profile for jobs',
      company: 'KoLabs company'
    },
    {
      name: '7Sport and UFA',
      url: '#',
      type: '2 Web',
      language: '.Net & ReactJS',
      description: 'Sports betting page',
      company: 'KoLabs company'
    },
    {
      name: 'Auvenir',
      url: '#',
      type: 'Web',
      language: '.Net & ReactJS',
      description: 'Engagement management',
      company: 'TiTan Technology'
    }
  ],
  skills: [
    {
      name: 'ReactJS',
      percent: 90,
      isNote: true
    },
    {
      name: 'HTML/CSS/Jquery',
      percent: 80,
      isNote: true
    },
    {
      name: '.Net Core',
      percent: 50
    },
    {
      name: 'ExpressJS',
      percent: 50
    },
    {
      name: 'PostgresSQL',
      percent: 70
    },
    {
      name: 'SQLServer',
      percent: 50
    },
    {
      name: 'Heroku',
      percent: 50
    },
    {
      name: 'AWS',
      percent: 50
    }
  ],
  hobbies: [
    {
      key: 'code',
      text: 'Code',
      icon: iconKeys.code
    },
    {
      key: 'football',
      text: 'Football',
      icon: iconKeys.soccer
    },
    {
      key: 'game',
      text: 'Game',
      icon: iconKeys.game
    },
    {
      key: 'history',
      text: 'History',
      icon: iconKeys.history
    },
    {
      key: 'music',
      text: 'Music',
      icon: iconKeys.headSet
    },
    {
      key: 'money',
      text: 'Money',
      icon: iconKeys.money
    }
  ],
  experiences:
    [
      {
        key: 'titan-technology',
        date: '01/2019',
        description: 'Join in outsource project about audit in large team size, over 200 members',
        imgUrl: titanLogo,
        tags: [
          {
            key: 'react-js',
            name: 'React JS'
          },
          {
            key: 'redux',
            name: 'Redux tool kit'
          },
          {
            key: 'net-core',
            name: '.Net core'
          },
          {
            key: 'micro-service',
            name: 'Micro service'
          },
          {
            key: 'unit-test',
            name: 'Unit test by Moq'
          },
          {
            key: 'postgres',
            name: 'Postgres SQL'
          },
          {
            key: 'sqlServer',
            name: 'sqlServer'
          }
        ],
        title: 'Full Stack Web developer at Titan Technology'
      },
      {
        key: 'kolab-llc',
        date: '04/2017',
        description: 'Join in outsource project about events organization in small team size, about 20 members, and 2 product projects about betting online',
        imgUrl: kolabsLogo,
        tags: [
          {
            key: 'react-js',
            name: 'React JS'
          },
          {
            key: 'redux',
            name: 'Redux'
          },
          {
            key: 'unittest-mocha',
            name: 'Unit test by mocha'
          }
        ],
        title: 'Web Frontend Engineer at KoLabs LLC'
      },
      {
        key: 'citynow-company',
        date: '10/2016',
        description: 'Join in outsource project with japanese customer in small team size, about 10 members, and a product project about Jobseeker site',
        imgUrl: citynowLogo,
        tags: [
          {
            key: 'react-js',
            name: 'React JS'
          },
          {
            key: 'flux',
            name: 'Flux'
          },
          {
            key: 'scala',
            name: 'Scala'
          },
          {
            key: 'postgres',
            name: 'Postgres SQL'
          }
        ],
        title: 'Full stack Engineer at Citynow Company'
      },
      {
        key: 'gameloft-company',
        date: '10/2015',
        description: 'Join to fix bugs for asphalt Nitro and Pes',
        imgUrl: gameLoftLogo,
        tags: [
          {
            key: 'c-plus',
            name: 'C++'
          },
          {
            key: 'java',
            name: 'Java'
          }
        ],
        title: 'Game developer at GameLoft'
      },
      {
        key: 'fujinet-company',
        date: '07/2015',
        description: 'Fresher, learn to use java to build a website',
        imgUrl: fujinetLogo,
        tags: [
          {
            key: 'java',
            name: 'Java'
          },
          {
            key: 'strust',
            name: 'Strust - Spring - Hibernate'
          }
        ],
        title: 'Web developer at Fujinet company'
      },
      {
        key: 'hcmus-university',
        date: '09/2011',
        description: 'study about software developement',
        imgUrl: natureScienceLogo,
        tags: [
          {
            key: 'software-tech',
            name: 'Software technology'
          }
        ],
        title: 'Student at university of science'
      },
    ]
}

const defaultReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case DEFAULT_ACTION:
      return {
        ...state,
        ...payload
      }
    case Utils.makeSagasActionType(DEFAULT_ACTION).SUCCESS:
      return {
        ...state,
        ...payload
      }
    case Utils.makeSagasActionType(DEFAULT_ACTION).FAILED:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default defaultReducer