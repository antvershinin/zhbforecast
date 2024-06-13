interface IForecasts 
    {
        user_score: number[];
        user_forecast: any[];
        user_id?: string;
        user_name?: string;
        forecast_points?: number;
        user_euro24_progress?: string;
    }
  

interface ITable  
    {
        forecast_points: number;
        exact: number;
        difference: number;
        outcome: number;
        user_id?: string;
        user_name?: string;
        user_euro24_progress?: string
    }
  

export const sortPlayers = (stage : 'group' | 'quaterfinals' | 'semifinals' | 'finals', table : ITable[], forecasts : IForecasts[]) => {

    const sortedForecasts = stage === 'group' ? [[], [], [], []] : stage === 'quaterfinals' ? [[],[],[],[],[],[],[],[]] : stage === 'semifinals' ? [[],[], [],[]] : stage === 'finals' ?[[], []] : null
    const sortedTable = stage === 'group' ? [[], [], [], []] : stage === 'quaterfinals' ? [[],[],[],[],[],[],[],[]] : stage === 'semifinals' ? [[],[], [],[]] : stage === 'finals' ?[[], []] : null

    if (stage === 'group') {
        table.forEach(el=>{
        el.user_euro24_progress.startsWith('A') && sortedTable[0].push(el)
        el.user_euro24_progress.startsWith('B') && sortedTable[1].push(el)
        el.user_euro24_progress.startsWith('C') && sortedTable[2].push(el)
        el.user_euro24_progress.startsWith('D') && sortedTable[3].push(el)
        })
        forecasts.forEach(el=>{
            el.user_euro24_progress.startsWith('A') && sortedForecasts[0].push(el)
            el.user_euro24_progress.startsWith('B') && sortedForecasts[1].push(el)
            el.user_euro24_progress.startsWith('C') && sortedForecasts[2].push(el)
            el.user_euro24_progress.startsWith('D') && sortedForecasts[3].push(el)
        })
    } else if (stage === "quaterfinals") { 
        table.map((el)=>{
        el.user_euro24_progress === 'TPL0' && sortedTable[0].push(el)
        el.user_euro24_progress === 'TPL1' && sortedTable[1].push(el)
        el.user_euro24_progress === 'TPR2' && sortedTable[2].push(el)
        el.user_euro24_progress === 'TPR3' && sortedTable[3].push(el)
        el.user_euro24_progress === 'BTL0' && sortedTable[4].push(el)
        el.user_euro24_progress === 'BTL1' && sortedTable[5].push(el)
        el.user_euro24_progress === 'BTR2' && sortedTable[6].push(el)
        el.user_euro24_progress === 'BTR3' && sortedTable[7].push(el)
      })
      forecasts.map((el)=>{
        el.user_euro24_progress === 'TPL0' && sortedForecasts[0].push(el)
        el.user_euro24_progress === 'TPL1' && sortedForecasts[1].push(el)
        el.user_euro24_progress === 'TPR2' && sortedForecasts[2].push(el)
        el.user_euro24_progress === 'TPR3' && sortedForecasts[3].push(el)
        el.user_euro24_progress === 'BTL0' && sortedForecasts[4].push(el)
        el.user_euro24_progress === 'BTL1' && sortedForecasts[5].push(el)
        el.user_euro24_progress === 'BTR2' && sortedForecasts[6].push(el)
        el.user_euro24_progress === 'BTR3' && sortedForecasts[7].push(el)
      }) 
      } 
      else if (stage === 'semifinals') {
        table.map((el)=> {
          el.user_euro24_progress === 'TPLSE' && sortedTable[0].push(el)
          el.user_euro24_progress === 'TPRSE' && sortedTable[1].push(el)
          el.user_euro24_progress === 'BTLSE' && sortedTable[2].push(el)
          el.user_euro24_progress === 'BTRSE' && sortedTable[3].push(el)
        })
        forecasts.map((el)=> {
          el.user_euro24_progress === 'TPLSE' && sortedForecasts[0].push(el)
          el.user_euro24_progress === 'TPRSE' && sortedForecasts[1].push(el)
          el.user_euro24_progress === 'BTLSE' && sortedForecasts[2].push(el)
          el.user_euro24_progress === 'BTRSE' && sortedForecasts[3].push(el)
        })
      } else if (stage === 'finals') {
        table.map((el)=>{
          el.user_euro24_progress === 'TOPFIN' && sortedTable[0].push(el)
          el.user_euro24_progress === 'BOTFIN' && sortedTable[1].push(el)
        })
        forecasts.map((el)=>{
          el.user_euro24_progress === 'TOPFIN' && sortedForecasts[0].push(el)
          el.user_euro24_progress === 'BOTFIN' && sortedForecasts[1].push(el)
        })
      }

      sortedTable.map((el)=>{
        el.sort((a, b) => {
          return (
            b.forecast_points - a.forecast_points ||
            b.exact - a.exact ||
            b.difference - a.difference ||
            b.outcome - a.outcome
          )
        });

      }) 

    return {sortedForecasts, sortedTable}
}