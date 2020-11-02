import { useRouter } from "next/router"
import { useEffect } from "react"
import { PageFrame } from "../../components/page-frame"
import { Backdrop } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import { PersonName } from "../../components/person-name"
import { personsState, useFetchPersonsIfNull } from "./index"
import { Address, Person } from "../../data/persons"
import { PersonAddress } from "../../components/person-address"

import { selector, useRecoilState } from "recoil"
import produce from "immer"

interface PersonName {
  firstName: string
  lastName: string
  firstNameKana: string
  lastNameKana: string
}

const selectedPerson = selector<Person | undefined>({
  key: "selected-person",
  get: ({ get }) => {
    const state = get(personsState)
    return state.persons[state.selectingPersonId]
  },
  set: ({ get, set }, newValue) => {
    set(
      personsState,
      produce(get(personsState), (d) => {
        const person = d.persons[d.selectingPersonId]
        if (person) {
          Object.assign(person, newValue)
        }
      })
    )
  },
})

const selectedPersonNameState = selector<PersonName | undefined>({
  key: "selected-person-name",
  get: ({ get }) => {
    const person = get(selectedPerson)
    if (!person) return undefined

    return {
      firstName: person.firstName,
      lastName: person.lastName,
      firstNameKana: person.firstNameKana,
      lastNameKana: person.lastNameKana,
    }
  },
  set: ({ get, set }, newValue) => {
    const person = get(selectedPerson)
    if (!person) return

    set(
      selectedPerson,
      produce(person, (d) => {
        Object.assign(d, newValue)
      })
    )
  },
})

const selectedPersonAddressState = selector<Address | undefined>({
  key: "selected-person-address",
  get: ({ get }) => {
    const person = get(selectedPerson)
    if (!person) return undefined

    return person.address
  },
  set: ({ get, set }, newValue) => {
    const person = get(selectedPerson)
    if (!person) return

    set(
      selectedPerson,
      produce(person, (d) => {
        Object.assign(d.address, newValue)
      })
    )
  },
})

const selectedPersonIdState = selector<string | undefined>({
  key: "selected-person-id",
  get: ({ get }) => {
    const state = get(personsState)
    return state.selectingPersonId
  },
  set: ({ get, set }, newValue) => {
    set(
      personsState,
      produce(get(personsState), (d) => {
        d.selectingPersonId = newValue as string
      })
    )
  },
})

export default function PersonDetail() {
  useFetchPersonsIfNull()
  const router = useRouter()
  const [selectedPersonId, setSelectedPersonId] = useRecoilState(
    selectedPersonIdState
  )
  useEffect(() => {
    // 1回目のレンダリング時はパスパラメータが取得できないので対策
    if (router.asPath !== router.route) {
      const personId = router.query["personId"]
      if (typeof personId === "string") {
        setSelectedPersonId(personId)
      } else {
        router.replace("/")
      }
    }

    return () => {
      setSelectedPersonId(undefined)
    }
  }, [])

  return !selectedPersonId ? (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <PageFrame title={"ダミーの人の詳細"}>
      <Name />
      <AddressView />
    </PageFrame>
  )
}

const Name = () => {
  const [person, setPersonName] = useRecoilState(selectedPersonNameState)
  const update = (fn: (d: PersonName) => void) => {
    setPersonName(produce(person, fn))
  }

  return (
    <PersonName
      firstName={person.firstName}
      lastName={person.lastName}
      firstNameKana={person.firstNameKana}
      lastNameKana={person.lastNameKana}
      onChangeFirstName={(v) => {
        update((p) => {
          p.firstName = v
        })
      }}
      onChangeLastName={(v) =>
        update((p) => {
          p.lastName = v
        })
      }
      onChangeFirstNameKana={(v) =>
        update((p) => {
          p.firstNameKana = v
        })
      }
      onChangeLastNameKana={(v) =>
        update((p) => {
          p.lastNameKana = v
        })
      }
    />
  )
}

const AddressView = () => {
  const [address, setAddress] = useRecoilState(selectedPersonAddressState)
  const update = (fn: (d: Address) => void) => {
    setAddress(produce(address, fn))
  }
  return (
    <PersonAddress
      prefecture={address.prefecture}
      city={address.city}
      block={address.block}
      building={address.building}
      onChangePrefecture={(v) =>
        update((a) => {
          a.prefecture = v
        })
      }
      onChangeCity={(v) =>
        update((a) => {
          a.city = v
        })
      }
      onChangeBlock={(v) =>
        update((a) => {
          a.block = v
        })
      }
      onChangeBuilding={(v) =>
        update((a) => {
          a.building = v
        })
      }
    />
  )
}
