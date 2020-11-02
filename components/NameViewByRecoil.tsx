import { atom, selector, useRecoilState, useRecoilValue } from "recoil"
import { Name } from "../data/name"
import { TextField } from "@material-ui/core"
import Container from "@material-ui/core/Container"

const nameStore = atom<Name>({
  key: "name",
  default: {
    firstName: "",
    lastName: "",
  },
})

const firstNameState = selector({
  key: "firstName",
  get: ({ get }) => get(nameStore).firstName,
  set: ({ get, set }, v) =>
    set(nameStore, { ...get(nameStore), ...{ firstName: v } }),
})

export const RecoilNameView = () => {
  return (
    <Container>
      <LastName />
      <FirstName />
    </Container>
  )
}

const FirstName = () => {
  const v = useRecoilValue(firstNameState)
  return <TextField label={"名"} value={v} />
}

const LastName = () => {
  const [v, set] = useRecoilState(nameStore)
  return (
    <TextField
      label={"姓"}
      value={v.lastName}
      onChange={(e) => set({ ...v, ...{ lastName: e.target.value } })}
    />
  )
}
