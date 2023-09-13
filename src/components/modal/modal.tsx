import { useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import Button from '../button/button'

export type ModalProps = {
  title?: string
  open?: boolean
  children: React.ReactNode
  onOk?: () => void
  onCancel?: () => void
  onClose: () => void
}

const Modal = ({
  title,
  open,
  children,
  onOk,
  onCancel,
  onClose,
}: ModalProps) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null)
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === modalOverlayRef.current) {
      onClose()
    }
  }
  return open ? (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
      ref={modalOverlayRef}
      onClick={handleOverlayClick}
    >
      <div className="w-[50%] min-h-[100px] flex flex-col bg-white border border-gray-500 rounded-xl px-4 py-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className=" font-semibold text-xl">
            {title ? title : 'Modal Title'}
          </h2>
          <div
            className=" hover:opacity-60 cursor-pointer"
            onClick={() => onClose()}
          >
            <AiOutlineClose size={20} />
          </div>
        </div>
        <div className="py-5">{children}</div>
        <div className="flex flex-row justify-end items-center">
          <div className="mx-2">
            <Button
              variant="primary"
              onClick={() => {
                if (onOk) onOk()
                onClose()
              }}
            >
              Confirm
            </Button>
          </div>
          <div className="mx-2">
            <Button
              variant="secondary"
              onClick={() => {
                if (onCancel) onCancel()
                onClose()
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Modal
