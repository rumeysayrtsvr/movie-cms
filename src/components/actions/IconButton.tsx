import { IconButton as MuiIconButton, Tooltip } from '@mui/material'
import { ReactNode } from 'react'

interface IconButtonProps {
  tooltip: string
  onClick: () => void
  children: ReactNode
  color?: 'default' | 'primary' | 'error'
  disabled?: boolean
}

export default function IconButton({ tooltip, onClick, children, color = 'default', disabled }: IconButtonProps) {
  return (
    <Tooltip title={tooltip}>
      <span>
        <MuiIconButton onClick={onClick} color={color} disabled={disabled} size="small">
          {children}
        </MuiIconButton>
      </span>
    </Tooltip>
  )
}
