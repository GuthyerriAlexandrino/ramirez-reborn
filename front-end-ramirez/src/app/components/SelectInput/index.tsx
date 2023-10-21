import Select from "../../../assets/select.svg"
import Image from "next/image"
import React, { useState } from "react"
import { Container, Icon, PopupContainer, PopupList } from "./style"

interface SelectInputProps {
  selectName: string
  children: React.ReactNode
}

export function SelectInput({ selectName, children }: SelectInputProps) {
  const [isActive, setIsActive] = useState(false)
  return (
    <Container onClick={() => setIsActive(!isActive)}>
      <small>
        {selectName.length > 16
          ? `${selectName.substring(0, 14)}...`
          : selectName}
      </small>
      <Icon>
        <Image src={Select} width={15} height={15} alt={"select icon"} />
      </Icon>
      <PopupContainer isActive={isActive}>
        <PopupList isActive={isActive}>{children}</PopupList>
      </PopupContainer>
    </Container>
  )
}
