import {
  Code,
  SportsSoccer,
  SportsEsports,
  MusicNote,
  MonetizationOn,
  Headset,
  History
} from '@material-ui/icons'

export const iconKeys = {
  code: 'code',
  soccer: 'soccer',
  game: 'game',
  music: 'music',
  money: 'money',
  headSet: 'headSet',
  history: 'history'
}

const MaterialUIIcons = {
  [iconKeys.code]: <Code />,
  [iconKeys.soccer]: <SportsSoccer />,
  [iconKeys.game]: <SportsEsports />,
  [iconKeys.music]: <MusicNote />,
  [iconKeys.money]: <MonetizationOn />,
  [iconKeys.history]: <History />,
  [iconKeys.headSet]: <Headset />
}

export const getIconByKey = (key) => {
  return MaterialUIIcons[key] || <Code />
}

export default MaterialUIIcons