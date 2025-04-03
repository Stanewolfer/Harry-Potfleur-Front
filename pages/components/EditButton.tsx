import React from 'react'
import {
  Button,
  Card,
  Divider,
  Icon,
  IconElement,
  Input,
  Modal,
  IconProps
} from '@ui-kitten/components'

// Composant EditButton
interface EditButtonProps {
  id: number
  onSave: (id: number, newName: string) => void
}

const EditButton = React.memo(({ id, onSave }: EditButtonProps) => {
  const [visible, setVisible] = React.useState(false)
  const [tempName, setTempName] = React.useState('')

  const EditIcon = (props: IconProps): IconElement => <Icon {...props} name='edit' />

  return (
    <>
      <Button
        status='primary'
        appearance='ghost'
        accessoryLeft={EditIcon}
        onPress={() => setVisible(true)}
      >
      </Button>
      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        onBackdropPress={() => setVisible(false)}
        style={{
          width: '80%',
          height: 'auto',
        }}
        animationType='fade'
      >
        <Card disabled>
          <Input
            placeholder='Entrez un nouveau nom'
            autoCapitalize='none'
            value={tempName}
            onChangeText={setTempName}
            selectTextOnFocus
          />
          <Divider style={{ marginVertical: 10 }} />
            <Button
            onPress={() => {
              if (tempName.trim()) {
              onSave(id, tempName)
              setVisible(false)
              }
            }}
            disabled={!tempName.trim()}
            >
            Sauvegarder
            </Button>
        </Card>
      </Modal>
    </>
  )
})

export default EditButton
