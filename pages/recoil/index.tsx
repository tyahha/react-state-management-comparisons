import { getPersons, Person, persons } from "../../data/persons"
import { Persons } from "../../components/Persons"
import { useEffect } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"

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

export const useFetchPersonsIfNull = () => {
  const [state, setState] = useRecoilState(personsState)
  useEffect(() => {
    if (Object.keys(state.persons).length <= 0) {
      getPersons().then((persons) => {
        const ps: Record<string, Person> = {}
        persons.forEach((p) => {
          ps[p.id] = p
        })
        setState({ ...state, ...{ persons: ps } })
      })
    }
  }, [])
}

export default function Recoil() {
  useFetchPersonsIfNull()
  const { persons } = useRecoilValue(personsState)
  return <Persons persons={Object.values(persons)} linkPrefix={"/recoil"} />
}
