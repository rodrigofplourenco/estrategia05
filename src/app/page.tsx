import MatchesTable from "@/components/matches-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FootballService } from "@/football-service";

export default async function Home() {
  const over05Matches = await FootballService.getTotalOver0_5Filtered();
  const over25Matches = await FootballService.getTotalOver2_5Filtered();
  const bothMatchesMerged = await FootballService.getMerged(over05Matches, over25Matches);

  return (
    <main className="h-full flex-col p-6">
      <header className="mb-6">
        <p className="text-3xl font-bold">Jogos de { new Date().toISOString().split('T')[0] }</p>
      </header>

      <div className="flex gap-6 justify-between flex-wrap">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>+0.5 HT</CardTitle>
            <CardDescription>
              Aqui vão as partidas com mais porcentagem de golo na primeira parte, filtradas por mais que 90% e pelo menos 8 partidas analisadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <MatchesTable
              matches={over05Matches}
            />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>+2.5 FT</CardTitle>
            <CardDescription>
              Aqui vão as partidas com mais porcentagem de pelo menos 3 golos na partida, filtradas por mais que 60% e pelo menos 8 partidas analisadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <MatchesTable
              matches={over25Matches}
            />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>0.5 HT e 2.5 FT</CardTitle>
            <CardDescription>
              As partidas que coincidem em ambas as estatisticas do lado esquerdo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <MatchesTable
              matches={bothMatchesMerged}
            />
          </CardContent>
        </Card>
      </div>

      <footer className="mt-6">
        <p>Desenvolvido com ❤️ por Rodrigo Lourenço</p>
      </footer>
    </main>
  );
}
