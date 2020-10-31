import { useRouter } from "next/router"
import { useEffect } from "react"
import { PageFrame } from "../../components/page-frame"
import { Backdrop } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import { PersonName } from "../../components/person-name"
import { usePersonStore } from "./index"
import { Address, Person } from "../../data/persons"
import { PersonAddress } from "../../components/person-address"
import shallow from "zustand/shallow"

export default function PersonDetail() {
  const router = useRouter()
  const { selectingPersonId, set } = usePersonStore()
  useEffect(() => {
    // 1回目のレンダリング時はパスパラメータが取得できないので対策
    if (router.asPath !== router.route) {
      const personId = router.query["personId"]
      if (typeof personId === "string") {
        set((s) => {
          s.selectingPersonId = personId
        })
      } else {
        router.replace("/")
      }
    }

    return () => {
      set((s) => {
        s.selectingPersonId = undefined
      })
    }
  }, [])
  return !selectingPersonId ? (
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
  const person = usePersonStore<
    | {
        firstName: string
        lastName: string
        firstNameKana: string
        lastNameKana: string
        update: (fn: (d: Person) => void) => void
      }
    | undefined
  >((s) => {
    if (!s.selectingPersonId) return undefined
    const p = s.persons[s.selectingPersonId]
    if (!p) return undefined
    return {
      firstName: p.firstName,
      lastName: p.lastName,
      firstNameKana: p.firstNameKana,
      lastNameKana: p.lastNameKana,
      update: (fn: (d: Person) => void) => {
        s.set((ss) => fn(ss.persons[s.selectingPersonId]))
      },
    }
  }, shallow)

  if (!person) return <></>

  return (
    <PersonName
      firstName={person.firstName}
      lastName={person.lastName}
      firstNameKana={person.firstNameKana}
      lastNameKana={person.lastNameKana}
      onChangeFirstName={(v) =>
        person.update((p) => {
          p.firstName = v
        })
      }
      onChangeLastName={(v) =>
        person.update((p) => {
          p.lastName = v
        })
      }
      onChangeFirstNameKana={(v) =>
        person.update((p) => {
          p.firstNameKana = v
        })
      }
      onChangeLastNameKana={(v) =>
        person.update((p) => {
          p.lastNameKana = v
        })
      }
    />
  )
}

const AddressView = () => {
  const address = usePersonStore<
    | {
        prefecture: string
        city: string
        block: string
        building: string
        update: (fn: (d: Address) => void) => void
      }
    | undefined
  >((s) => {
    if (!s.selectingPersonId) return undefined
    const p = s.persons[s.selectingPersonId]
    if (!p) return undefined
    return {
      prefecture: p.address.prefecture,
      city: p.address.city,
      block: p.address.block,
      building: p.address.building,
      update: (fn: (d: Address) => void) => {
        s.set((ss) => fn(ss.persons[s.selectingPersonId].address))
      },
    }
  }, shallow)

  if (!address) return <></>

  return (
    <PersonAddress
      prefecture={address.prefecture}
      city={address.city}
      block={address.block}
      building={address.building}
      onChangePrefecture={(v) =>
        address.update((a) => {
          a.prefecture = v
        })
      }
      onChangeCity={(v) =>
        address.update((a) => {
          a.city = v
        })
      }
      onChangeBlock={(v) =>
        address.update((a) => {
          a.block = v
        })
      }
      onChangeBuilding={(v) =>
        address.update((a) => {
          a.building = v
        })
      }
    />
  )
}
