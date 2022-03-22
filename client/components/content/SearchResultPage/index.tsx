import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { SearchResultContainer } from "./SearchResult.Container"

export default function SearchResultPage() {
  const [isOpen, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <SearchResultContainer />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
