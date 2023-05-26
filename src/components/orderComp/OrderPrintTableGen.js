import pdfMake from "pdfmake/build/pdfmake";
import pdfFont from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFont.pdfMake.vfs

export const OrderPrintTableGen = async (row, foundClient) => {
    console.log(row, foundClient)
    const table = {
        content: [
            {
                table: {
                    body : [
                        ['Матеріал','Кіль.','Обробка','Свердлення','Гартування','Дод. Роботи',],
                        ['Бронза','5','Поліровка','','Ні','Уф.Друк',]
                    ]
                }
            }
        ]
    }
    
    let data
    await pdfMake.createPdf(table).getDataUrl((dataUrl)=> data = dataUrl)
    return(data)
}
