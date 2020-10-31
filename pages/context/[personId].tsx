import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { getPerson, Person } from "../../data/persons"
import { PageFrame } from "../../components/page-frame"
import { PersonName } from "../../components/person-name"
import { Loading } from "../../components/loading"
import { PersonAddress } from "../../components/person-address"

const PersonContext = createContext<{
  person: Person
  onChange: (p: Person) => void
}>({ person: undefined as Person, onChange: () => {} })

export default function PersonDetail() {
  const router = useRouter()
  const [person, setPerson] = useState<Person | undefined>(undefined)
  useEffect(() => {
    // 1回目のレンダリング時はパスパラメータが取得できないので対策
    if (router.asPath !== router.route) {
      const personId = router.query["personId"]
      if (typeof personId === "string") {
        getPerson(personId)
          .then((person) => {
            setPerson(person)
          })
          .catch(() => {
            router.replace("/")
          })
      } else {
        router.replace("/")
      }
    }
  }, [router])
  return !person ? (
    <Loading visible={true} />
  ) : (
    <PersonContext.Provider value={{ person, onChange: setPerson }}>
      <PageFrame title={"ダミーの人の詳細"}>
        <Name />
        <Address />
      </PageFrame>
    </PersonContext.Provider>
  )
}

const Name = () => {
  const { person, onChange } = useContext(PersonContext)

  return (
    <PersonName
      firstName={person.firstName}
      lastName={person.lastName}
      firstNameKana={person.firstNameKana}
      lastNameKana={person.lastNameKana}
      onChangeFirstName={(v) => onChange({ ...person, ...{ firstName: v } })}
      onChangeLastName={(v) => onChange({ ...person, ...{ lastName: v } })}
      onChangeFirstNameKana={(v) =>
        onChange({ ...person, ...{ firstNameKana: v } })
      }
      onChangeLastNameKana={(v) =>
        onChange({ ...person, ...{ lastNameKana: v } })
      }
    />
  )
}

const Address = () => {
  const { person, onChange } = useContext(PersonContext)

  return (
    <PersonAddress
      prefecture={person.address.prefecture}
      city={person.address.city}
      block={person.address.block}
      building={person.address.building}
      onChangePrefecture={(v) =>
        onChange({
          ...person,
          ...{ address: { ...person.address, ...{ prefecture: v } } },
        })
      }
      onChangeCity={(v) =>
        onChange({
          ...person,
          ...{ address: { ...person.address, ...{ city: v } } },
        })
      }
      onChangeBlock={(v) =>
        onChange({
          ...person,
          ...{ address: { ...person.address, ...{ block: v } } },
        })
      }
      onChangeBuilding={(v) =>
        onChange({
          ...person,
          ...{ address: { ...person.address, ...{ building: v } } },
        })
      }
    />
  )
}
