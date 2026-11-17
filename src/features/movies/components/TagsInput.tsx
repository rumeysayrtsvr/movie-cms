import { Autocomplete, Chip, TextField } from '@mui/material'

interface Props {
  label: string
  placeholder: string
  options: string[]
  value: string[]
  onChange: (val: string[]) => void
  sx?: object
}

export default function FreeSoloMultiField({ label, placeholder, options, value, onChange, sx }: Props) {
  return (
    <Autocomplete
      multiple
      freeSolo
      size="small"
      sx={sx}
      options={options}
      value={value}
      onChange={(_, newVal) => onChange(newVal as string[])}
      renderTags={(val, getTagProps) =>
        val.map((option, i) => {
          const { key, ...tagProps } = getTagProps({ index: i })
          return <Chip key={key} {...tagProps} label={option} size="small" />
        })
      }
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  )
}
