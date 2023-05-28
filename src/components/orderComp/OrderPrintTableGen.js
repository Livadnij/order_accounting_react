import pdfMake from "pdfmake/build/pdfmake";
import pdfFont from "pdfmake/build/vfs_fonts"
import { edgeDecode, materialDecode, sandblastingDecode, workDecode } from "../WorkDecoding";
pdfMake.vfs = pdfFont.pdfMake.vfs

export const OrderPrintTableGen = (row, foundClient) => {
    const dateConvert = (date) => {
        const dateSplit = date.split(".")
        const correctDate = `${dateSplit[1]}.0${dateSplit[0]}.${dateSplit[2]}`
        console.log(dateSplit, correctDate)
        return correctDate
      }

      const drillingMap = (row, propName) => {
        const drillingCell = []
        row.drilling.map((drilling) => (
            drillingCell.push(`${propName ? 'ø' : ''} ${propName ? drilling.valueOne : drilling.valueTwo} ${propName ? '' : 'од.'}`)
            ))
            return (
                drillingCell
            )
      }

      const additionalMap = (row) => {
        const additionalCell = []
        row.painting.map((painting) => {
            if(painting.work === 3 ) {
                    additionalCell.push(`${workDecode[painting.work-1].prop} ${painting.valueOne}`)
                } else if (painting.work === 4 ) {
                    additionalCell.push( `${workDecode[painting.work-1].prop} ${painting.valueOne} ${painting.valueTwo}`)
                } else if (painting.work === 5 ) {
                    additionalCell.push(`${workDecode[painting.work-1].prop} ${sandblastingDecode[painting.valueOne].prop}`)
                } else if (painting.work === 6) {
                } else {
                    additionalCell.push(`${workDecode[painting.work-1].prop}`)}
        })
            
            return (
                additionalCell
            )
      }

      const temperingSearch = (row) => {
        console.log(row, '1')
        const tempering = row.painting.find(obj => obj.work ===  6)
        return(tempering?"Так":"Ні")
      }

      const tableBody = () => {
      const table = 
    [
        [{text:'Матеріал\n(Дов. * Шир.)',style: 'tableHeader',rowSpan: 2},{text:'Кіль.',style: 'tableHeader',rowSpan: 2},{text:'Обробка Кромки',style: 'tableHeader',rowSpan: 2},{text:'Свердлення',style: 'tableHeader',colSpan: 2},{},{text:'Гарт.',style: 'tableHeader',rowSpan: 2},{text:'Додаткові Роботи',style: 'tableHeader',rowSpan: 2}],
                        ['','','','діам.','кіль.','',''],
    ]
      
      row.material.map((row) => (
        table.push(
            [
                `${materialDecode[row.material-1].prop} "${row.thickness}" (${row.height}*${row.width})`,`${row.count}`,`${edgeDecode[row.edge].prop}`,drillingMap(row, 'holeDiam'),drillingMap(row, ''),temperingSearch(row),additionalMap(row)
            ],
        )
      ))
      return table
    }


    console.log(row, foundClient)
    const table = {
        content: [
                {text: `№: ${row.ordID}`},
                {text: `Замовник: ${foundClient.Name}`},
                {
                    table: {
                        widths: [250, "*"],
                        body: [[{text: `Від: ${dateConvert(row.dateStart)}`},{text: `Дата Відгрузки: ${dateConvert(row.dateFinish)}`}]]
                    },
                    layout: 'noBorders'
                } ,             
            {
                table: {
                    widths: [125, 30, 80, 30, 30, 30, 125],
                    body :  tableBody()
                }
            }
        ]
    }
    
    let data = pdfMake.createPdf(table)
    return(data)
}
