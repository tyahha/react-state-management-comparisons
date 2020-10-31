export interface Person {
  id: string
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  address: Address
  tel: string
  email: string
  birthDay: string
  gender: string
  registrationDate: string
}

export interface Address {
  zipCode: string
  prefecture: string
  city: string
  block: string
  building: string
}

export const persons: Person[] = [
  {
    id: "0000000001",
    lastName: "牧野",
    firstName: "真桜",
    lastNameKana: "マキノ",
    firstNameKana: "マオ",
    address: {
      zipCode: "220-0062",
      prefecture: "神奈川県",
      city: "横浜市西区東久保町",
      block: "2-1-4",
      building: "",
    },
    tel: "0461587612",
    email: "maomakino@nqlt.jx",
    birthDay: "1965-03-18",
    gender: "2",
    registrationDate: "2020-10-09",
  },
  {
    id: "0000000002",
    lastName: "田沢",
    firstName: "美枝子",
    lastNameKana: "タザワ",
    firstNameKana: "ミエコ",
    address: {
      zipCode: "338-0011",
      prefecture: "埼玉県",
      city: "さいたま市中央区新中里",
      block: "1-14",
      building: "",
    },
    tel: "048747243",
    email: "miekotazawa@vqerbzn.zc.jtn",
    birthDay: "1995-10-11",
    gender: "2",
    registrationDate: "2020-02-14",
  },
  {
    id: "0000000003",
    lastName: "藤井",
    firstName: "昌二",
    lastNameKana: "フジイ",
    firstNameKana: "ショウジ",
    address: {
      zipCode: "800-0315",
      prefecture: "福岡県",
      city: "京都郡苅田町港町",
      block: "2-20-1",
      building: "",
    },
    tel: "0938410048",
    email: "shouji_fujii@zzkhugaiqj.ec",
    birthDay: "1972-03-20",
    gender: "1",
    registrationDate: "2019-01-06",
  },
  {
    id: "0000000004",
    lastName: "稲村",
    firstName: "啓之",
    lastNameKana: "イナムラ",
    firstNameKana: "ヒロユキ",
    address: {
      zipCode: "520-2264",
      prefecture: "滋賀県",
      city: "大津市大石東",
      block: "1-1-20",
      building: "",
    },
    tel: "0740669916",
    email: "ana-g=pmbkcfhiroyuki84710@flfdhdg.lr.xao",
    birthDay: "1990-04-29",
    gender: "1",
    registrationDate: "2018-05-28",
  },
  {
    id: "0000000005",
    lastName: "石本",
    firstName: "尚紀",
    lastNameKana: "イシモト",
    firstNameKana: "ナオキ",
    address: {
      zipCode: "771-2301",
      prefecture: "徳島県",
      city: "三好市三野町清水",
      block: "4-11-20",
      building: "",
    },
    tel: "0886966053",
    email: "naoki4893@fbtpg.lqt",
    birthDay: "1970-05-03",
    gender: "1",
    registrationDate: "2018-12-16",
  },
]

export const getPersons = (): Promise<Person[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(persons), 1000)
  })

export const getPerson = (personId: string): Promise<Person> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const person = persons.find((p) => p.id === personId)
      if (person) {
        resolve(person)
      } else {
        reject(new Error("not found person"))
      }
    }, 1000)
  })
