import { Meta } from '@storybook/react'
import { useState } from 'react'

import Button from '../button/button'
import Modal from './modal'

const meta: Meta<typeof Modal> = {
  title: 'Component/Modal',
  component: Modal,
}
export default meta

export const OpenCloseModalStory = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button
        variant="info"
        onClick={() => {
          setOpen(true)
        }}
      >
        Modal Toggle
      </Button>
      <Modal title="Test Modal" open={open} onClose={() => setOpen(false)}>
        Hello world
      </Modal>
    </div>
  )
}

OpenCloseModalStory.story = {
  name: 'Modal test',
}
