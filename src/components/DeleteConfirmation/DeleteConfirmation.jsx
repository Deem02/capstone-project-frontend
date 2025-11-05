import { useState } from "react"
import Modal from "../Modal/Modal"

import { Trash } from 'react-feather'

export default function DeleteConfirmation({ open, onClose, onConfirm, itemType = 'item' }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <Trash size={56} className="mx-auto text-red-500" />
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this {itemType}?
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button className="btn btn-danger"
            onClick={onConfirm}
          >
            Delete</button>
          <button className="btn btn-cancel"
            onClick={onClose}
          >
            Cancel</button>

        </div>
      </div>
    </Modal>

  )
}