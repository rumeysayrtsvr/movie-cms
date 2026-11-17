import { Autocomplete, Chip, TextField } from '@mui/material'
import { Category } from '@/types'

interface Props {
  options: Category[]
  value: Category[]
  onChange: (ids: string[]) => void
}

export default function CategorySelect({ options, value, onChange }: Props) {
  return (
    <Autocomplete
      multiple
      size="small"
      options={options}
      getOptionLabel={(c) => c.name}
      value={value}
      onChange={(_, newVal) => onChange(newVal.map((c) => String(c.num_id ?? c.id)))}
      isOptionEqualToValue={(o, v) => (o.num_id != null ? o.num_id === v.num_id : o.id === v.id)}
      renderTags={(val, getTagProps) =>
        val.map((c, i) => {
          const { key, ...tagProps } = getTagProps({ index: i })
          return <Chip key={key} {...tagProps} label={c.name} size="small" />
        })
      }
      renderInput={(params) => (
        <TextField {...params} label="Kategoriler" placeholder="Kategori seç..." />
      )}
    />
  )
}
