export class Match {
  teamName: string;
  country: string;
  flag: string;
  leagueName: string;
  leagueID: string;
  numMatches: string;
  percent: number;
  fixdate: string;
  date: string;
  vs: string;
  homeaway: string;
  homeTeam: string;
  awayTeam: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.teamName = data.teamName;
    this.country = data.country;
    this.flag = data.flag;
    this.leagueName = data.leagueName;
    this.leagueID = data.leagueID;
    this.numMatches = data.numMatches;
    this.percent = data.percent;
    this.fixdate = data.fixdate;
    this.date = new Date(+data.fixdate).toLocaleString();
    this.vs = data.vs;
    this.homeaway = data.homeaway;

    const isHome = data.homeaway == 'H';

    this.homeTeam = isHome ? data.teamName : data.vs;
    this.awayTeam = isHome ? data.vs : data.teamName;
  }
}
