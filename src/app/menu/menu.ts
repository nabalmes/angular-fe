import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'members',
    title: 'Members',
    type: 'item',
    icon: 'user',
    url: 'members',
    role: ['Basic']
  },
  {
    id: 'membership',
    title: 'Membership',
    type: 'item',
    icon: 'home',
    url: 'meters',
    role: ['Basic']
  },
  {
    id: 'accounts',
    title: 'Accounts',
    type: 'item',
    icon: 'home',
    url: 'accounts',
    role: ['Basic']
  },
  {
    id: 'family',
    title: 'Family',
    type: 'item',
    icon: 'home',
    url: 'family',
    role: ['Basic']
  }
]
