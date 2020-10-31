import { Container } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"

export const PersonAddress = ({
  prefecture,
  city,
  block,
  building,
  onChangePrefecture,
  onChangeCity,
  onChangeBlock,
  onChangeBuilding,
}: {
  prefecture: string
  city: string
  block: string
  building: string
  onChangePrefecture?: (v: string) => void
  onChangeCity?: (v: string) => void
  onChangeBlock?: (v: string) => void
  onChangeBuilding?: (v: string) => void
}) => {
  return (
    <Container>
      <Box>
        <TextField
          label={"都道府県"}
          value={prefecture}
          onChange={(e) => onChangePrefecture(e.target.value)}
        />
        <TextField
          label={"市区町村"}
          value={city}
          onChange={(e) => onChangeCity(e.target.value)}
        />
        <TextField
          label={"番地"}
          value={block}
          onChange={(e) => onChangeBlock(e.target.value)}
        />
        <TextField
          label={"建物名"}
          value={building}
          onChange={(e) => onChangeBuilding(e.target.value)}
        />
      </Box>
    </Container>
  )
}
