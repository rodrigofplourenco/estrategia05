/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Match } from "./models/match";

export class FootballService {
  private static accessKey = 'APpdjfrJK7rcPjzvVd6o3kpioD7XwBaz';
  private static apiClient = axios.create({
    baseURL: 'https://www.adamchoi.co.uk/scripts/data/json/scripts/getStatsTablesSecure.php',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Host-Origin': 'https://dicasbet.com.br',
      'Authorization-Client': 'ADAMCHOI.CO.UK',
      'Referer': 'https://www.adamchoi.co.uk/widget.html',
      'Cec-Ch-Ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
      'Cec-Ch-Ua-Mobile': '?0',
      'Cec-Ch-Ua-Platform': 'Windows"',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
    }
  });
  
  static async getTotalOver0_5Filtered() {
    const { data } = await this.apiClient.get('', {
      params: {
        'clflc': 'abc',
        'stat': 'TeamTotal1HOver0_5',
        'numMatches': '10',
        'minPercent': 50,
        'getFixtures': false,
        'accesskey': this.accessKey,
        'minPlayed': false,
        'timezoneOffset': -60,
        'date': new Date().toISOString().split('T')[0],
      }
    });

    const filteredData: Match[] = this.filterData(data, 90, 8);

    return filteredData;
  }

  static async getTotalOver2_5Filtered() {
    const { data } = await this.apiClient.get('', {
      params: {
        'clflc': 'abc',
        'stat': 'Over2_5',
        'numMatches': '10',
        'minPercent': 50,
        'getFixtures': false,
        'accesskey': this.accessKey,
        'minPlayed': false,
        'timezoneOffset': -60,
        'date': new Date().toISOString().split('T')[0],
      }
    });
   
    const filteredData: Match[] = this.filterData(data, 60, 8);

    return filteredData;
  }

  static async getMerged(total05: Match[], total25: Match[]) {
    const playingTeamNames = total05.map(match => match.homeTeam);

    const merged = total25.filter(match => playingTeamNames.includes(match.homeTeam));

    return merged;
  }

  private static filterData(data: any, minPercentage: number, minTeamMatches: number) {
    let filteredAll = [];

    for (const dataItem of data.Teams) {
      switch (dataItem.list) {
        case 'All':
          filteredAll = dataItem.teams.filter((team: any) => {
            const teamMatchesNumber = +team.numMatches.split('/')[0]

            const isPercentageGood = team.percent >= minPercentage;
            const areTeamMatchesNumberGood = teamMatchesNumber >= minTeamMatches;

            return isPercentageGood && areTeamMatchesNumberGood;
          }).map((team: any) => new Match(team)).filter((matchOne: any, idx: any, list: any) => 
            list.findIndex((matchTwo: any) => (matchTwo.homeTeam === matchOne.homeTeam)) === idx
          );
          break;
      }
    }

    return filteredAll;
  }
}
