import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Tooltip,
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

const waterIcon = (props): IconElement => <Icon {...props} name='droplet' />
const temperatureIcon = (props): IconElement => (
  <Icon {...props} name='thermometer' />
)
const sunlightIcon = (props): IconElement => <Icon {...props} name='sun' />

const PlantsInfos = React.memo(
  ({ waterLevel, temperature, sunlight }: PlantsInfosProps) => {
    const [waterVisible, setWaterVisible] = useState(false)
    const [tempVisible, setTempVisible] = useState(false)
    const [sunVisible, setSunVisible] = useState(false)

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
        <Tooltip
          anchor={() => (
            <TouchableOpacity onPress={() => setWaterVisible(true)}>
              <CircularProgressBar
                progress={waterLevel / 100}
                size='tiny'
                status='info'
                renderIcon={waterIcon}
              />
            </TouchableOpacity>
          )}
          visible={waterVisible}
          onBackdropPress={() => setWaterVisible(false)}
        >
          {`Niveau d'eau: ${waterLevel}%`}
        </Tooltip>

        <Tooltip
          anchor={() => (
            <TouchableOpacity onPress={() => setTempVisible(true)}>
              <CircularProgressBar
                progress={temperature / 40}
                size='tiny'
                status='danger'
                renderIcon={temperatureIcon}
              />
            </TouchableOpacity>
          )}
          visible={tempVisible}
          onBackdropPress={() => setTempVisible(false)}
        >
          {`Température: ${temperature}°C`}
        </Tooltip>

        <Tooltip
          anchor={() => (
            <TouchableOpacity onPress={() => setSunVisible(true)}>
              <CircularProgressBar
                progress={sunlight / 100}
                size='tiny'
                status='warning'
                renderIcon={sunlightIcon}
              />
            </TouchableOpacity>
          )}
          visible={sunVisible}
          onBackdropPress={() => setSunVisible(false)}
        >
          {`Luminosité: ${sunlight} lux`}
        </Tooltip>
      </Layout>
    )
  }
)

export default PlantsInfos
