import { persons } from "../../data/persons"
import { Persons } from "../../components/Persons"

export default function Context() {
  return <Persons persons={persons} linkPrefix={"/context"} />
}
