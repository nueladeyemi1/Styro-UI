import React from 'react'
import { storiesOf } from '@storybook/react'

import { Styro } from '../components/styro'

const stories = storiesOf('App test', module)

stories.add('App', () => {
  return <Styro play={false} />
})
