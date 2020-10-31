import { getPersons, Person, persons } from "../../data/persons"
import { Persons } from "../../components/Persons"
import create from "zustand"
import produce from "immer"
import { useEffect, useMemo } from "react"

export interface PersonState extends Record<string | number | symbol, unknown> {
  persons: Record<string, Person>
  selectingPersonId?: string
}

export const usePersonStore = create<
  PersonState & {
    fetchPerson: () => void
    set: (fn: (draft: PersonState) => void) => void
  }
>((set) => ({
  persons: {},
  fetchPerson: async () => {
    const ps = await getPersons()
    const pp = {} as Record<string, Person>
    ps.forEach((p) => {
      pp[p.id] = p
    })
    set({ persons: pp })
  },
  set: (fn) => set(produce(fn)),
}))

export default function Zustand() {
  const { persons, fetchPerson } = usePersonStore()
  useEffect(() => fetchPerson(), [])
  return <Persons persons={Object.values(persons)} linkPrefix={"/zustand"} />
}
