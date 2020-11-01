import { getPersons, Person, persons } from "../../data/persons"
import { Persons } from "../../components/Persons"
import { useEffect } from "react"
import { atom, useRecoilState } from "recoil"

export interface PersonState extends Record<string | number | symbol, unknown> {
  persons: Record<string, Person>
  selectingPersonId?: string
}

export const personsState = atom<PersonState>({
  key: "persons",
  default: {
    persons: {},
  },
})

export default function Recoil() {
  const [state, setState] = useRecoilState(personsState)
  useEffect(() => {
    getPersons().then((persons) => {
      const ps: Record<string, Person> = {}
      persons.forEach((p) => {
        ps[p.id] = p
      })
      setState({ ...state, ...{ persons: ps } })
    })
  }, [])
  return (
    <Persons persons={Object.values(state.persons)} linkPrefix={"/recoil"} />
  )
}
