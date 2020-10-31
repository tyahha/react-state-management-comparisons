import { Container } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"

export const PersonName = ({
  firstName,
  lastName,
  firstNameKana,
  lastNameKana,
  onChangeFirstName,
  onChangeLastName,
  onChangeFirstNameKana,
  onChangeLastNameKana,
}: {
  firstName: string
  lastName: string
  firstNameKana: string
  lastNameKana: string
  onChangeFirstName?: (s: string) => void
  onChangeLastName?: (s: string) => void
  onChangeFirstNameKana?: (s: string) => void
  onChangeLastNameKana?: (s: string) => void
}) => {
  return (
    <Container>
      <Box>
        <TextField
          label={"姓"}
          value={lastName}
          onChange={(e) => onChangeLastName(e.target.value)}
        />
        <TextField
          label={"名"}
          value={firstName}
          onChange={(e) => onChangeFirstName(e.target.value)}
        />
        <TextField
          label={"セイ"}
          value={lastNameKana}
          onChange={(e) => onChangeLastNameKana(e.target.value)}
        />
        <TextField
          label={"メイ"}
          value={firstNameKana}
          onChange={(e) => onChangeFirstNameKana(e.target.value)}
        />
      </Box>
    </Container>
  )
}
