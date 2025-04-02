import React from 'react'
import {
  Card,
  CircularProgressBar,
  Icon,
  IconElement,
  Layout
} from '@ui-kitten/components'

interface PlantsInfosProps {
  waterLevel: number
  temperature: number
  sunlight: number
}

const waterIcon = (props): IconElement => (
  <Icon {...props} name='droplet' />
)
const temperatureIcon = (props): IconElement => (
  <Icon {...props} name='thermometer' />
)
const sunlightIcon = (props): IconElement => (
  <Icon {...props} name='sun' />
)

const PlantsInfos = React.memo(
  ({ waterLevel, temperature, sunlight }: PlantsInfosProps) => {
    return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: 16
      }}
    >
      <CircularProgressBar
        progress={waterLevel / 100}
        size='tiny'
        status='info'
        renderIcon={waterIcon}
      />
      <CircularProgressBar
        progress={temperature / 100}
        size='tiny'
        status='danger'
        renderIcon={temperatureIcon}
      />
      <CircularProgressBar
        progress={sunlight / 100}
        size='tiny'
        status='warning'
        renderIcon={sunlightIcon}
      />
    </Layout>
    )
  }
)

export default PlantsInfos
