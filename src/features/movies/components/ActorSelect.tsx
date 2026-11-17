import { Autocomplete, Avatar, Box, Chip, TextField } from '@mui/material'
import { Actor } from '@/types'

interface Props {
  options: Actor[]
  value: Actor[]
  onChange: (ids: string[]) => void
}

export default function ActorSelect({ options, value, onChange }: Props) {
  return (
    <Autocomplete
      multiple
      size="small"
      options={options}
      getOptionLabel={(a) => a.name}
      value={value}
      onChange={(_, newVal) => onChange(newVal.map((a) => a.id))}
      isOptionEqualToValue={(o, v) => o.id === v.id}
      renderOption={(props, actor) => {
        const { key, ...restProps } = props as React.HTMLAttributes<HTMLLIElement> & { key?: React.Key }
        return (
          <Box key={key} component="li" sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }} {...restProps}>
            <Avatar src={actor.photo_url ?? undefined} sx={{ width: 28, height: 28, fontSize: 12 }}>
              {actor.name[0]}
            </Avatar>
            {actor.name}
          </Box>
        )
      }}
      renderTags={(val, getTagProps) =>
        val.map((a, i) => {
          const { key, ...tagProps } = getTagProps({ index: i })
          return (
            <Chip
              key={key}
              {...tagProps}
              label={a.name}
              size="small"
              avatar={<Avatar src={a.photo_url ?? undefined}>{a.name[0]}</Avatar>}
            />
          )
        })
      }
      renderInput={(params) => (
        <TextField {...params} label="Oyuncular" placeholder="Oyuncu seç..." />
      )}
    />
  )
}
