import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import { Person } from "../data/persons"
import Link from "next/link"
import { PageFrame } from "./page-frame"

export function Persons({
  persons,
  linkPrefix,
}: {
  persons: Person[]
  linkPrefix: string
}) {
  return (
    <PageFrame title={"ダミーの人一覧"}>
      <TableContainer>
        <Table>
          <TableHead
            style={{
              backgroundColor: "#f0f0f0",
              color: "white",
            }}
          >
            <TableCell>氏名</TableCell>
            <TableCell>登録日</TableCell>
          </TableHead>
          <TableBody>
            {persons.map((p) => {
              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <Link href={`${linkPrefix}/${p.id}`}>
                      <a href={"#"}>{p.lastName + p.firstName}</a>
                    </Link>
                  </TableCell>
                  <TableCell>{p.registrationDate}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </PageFrame>
  )
}
