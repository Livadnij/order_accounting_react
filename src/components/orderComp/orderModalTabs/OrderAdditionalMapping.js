import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { orderMaterialRemoveAddition } from '../../toolkitSlice';

const OrderAdditionalMapping = (props) => {
    const rows = useSelector((state) => state.toolkit.tempMaterialInfo)
    const deleteElement = useSelector((state)=>state.toolkit.orderMaterialDelete)? '': 'none';
    const dispatch = useDispatch();
    const propName = props.propName
    const rowIndex = props.rowIndex

    const workObject = {
        1:'Свердлення',
        2:'Уф.Друк',
        3:'Фарбування',
        4:'Подвійне Фарбування',
        5:'Піскуоструй',
        6:'Гартування',
        7:'Порізка Лазером',
        8:'Поклійка Оракала',
        9:'Поклійка Броні'
      }
    
      const drillingDiam = {
        1:'ø5',
        2:'ø6',
        3:'ø7',
        4:'ø8',
        5:'ø9',
        6:'ø10'
      }
    
      const sandblasting = {
        1:'Повний Фоновий',
        2:'3/4 Фоновий',
        3:'Половина Фоновий',
        4:'1/4 Фоновий',
        5:'Фігурний',
      }

      let data = []

for(let i=0; i<=rows[rowIndex][propName].length-1; i++) {
    if(rows[rowIndex][propName][i].work === 1){
        data.push([
            workObject[rows[rowIndex][propName][i].work]+ " ",
            drillingDiam[rows[rowIndex][propName][i].valueOne]+ " ",
            "- ", 
            rows[rowIndex][propName][i].valueTwo+" "+"од.",
        ])} else if (rows[rowIndex][propName][i].work === 3 ) {
            data.push([
                workObject[rows[rowIndex][propName][i].work]+ " ",
                rows[rowIndex][propName][i].valueOne
        ])} else if (rows[rowIndex][propName][i].work === 4 ) {
            data.push([
                workObject[rows[rowIndex][propName][i].work],
                rows[rowIndex][propName][i].valueOne,
                rows[rowIndex][propName][i].valueTwo
        ])} else if (rows[rowIndex][propName][i].work === 5 ) {
            data.push([
                workObject[rows[rowIndex][propName][i].work],
                sandblasting[rows[rowIndex][propName][i].valueOne]
        ])} else {
            data.push([
                workObject[rows[rowIndex][propName][i].work]
            ])}
console.log(data) 
}

  return (
    <Box>
        {data.map((row, index) => (
            <Box key={index} sx={{display: 'flex', alignItems: 'center'}}>
                {row}
                <IconButton
                sx={{display: deleteElement}}
                onClick={() => {dispatch(orderMaterialRemoveAddition({rowIndex, propName, index}))}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        ))}
      </Box>
  )
}

export default OrderAdditionalMapping
