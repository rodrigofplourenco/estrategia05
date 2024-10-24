import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Match } from "@/models/match";
import { randomUUID } from "crypto";

const MatchesTable = ({ matches }: { matches: Match[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Liga</TableHead>
          <TableHead>Partida</TableHead>
          <TableHead>Quando</TableHead>
          <TableHead className="text-right">Observações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match: Match) => (
           <TableRow key={randomUUID()}>
            <TableCell className="font-medium">{ match.leagueName }</TableCell>
            <TableCell>{ match.homeTeam } VS {match.awayTeam}</TableCell>
            <TableCell>{ match.date }</TableCell>
            <TableCell className="text-right">{match.numMatches} partidas, {match.percent}% probabilidade.</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
 
export default MatchesTable;
