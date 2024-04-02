import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus } from '../store/GloabalOrdersList'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import { statusDecode } from '../WorkDecoding'

const MainTableStatus = ({infoRow}) => {
    const dispatch = useDispatch();
    const getOrdData = useSelector((state) => state.globalOrders.orders)
    const currentCollName = useSelector((state) => state.globalOrders.currentCollName)
    const indexOfOrder = getOrdData.findIndex(obj => obj.ranID === infoRow.ranID)
    const onChange = (value) => {
        if(getOrdData.length && indexOfOrder !== -1){
        dispatch(changeStatus({index: indexOfOrder, value: value }))
        deleteDoc(doc(db, currentCollName.name, infoRow.ranID));
        setDoc(doc(db, currentCollName.name, infoRow.ranID), {
            ranID:infoRow.ranID,
            ordID:infoRow.ordID,
            dateStart:infoRow.dateStart,
            dateFinish:infoRow.dateFinish,
            clID:infoRow.clID,
            fullPrice:infoRow.fullPrice,
            paid:infoRow.paid,
            status: value,
            fullPaid:infoRow.fullPaid,
            installation:infoRow.installation,
            delivery:infoRow.delivery,
            adress:infoRow.adress,
            comments:infoRow.comments,
            material: infoRow.material
        });
    }
    }

  return (
    <FormControl fullWidth >
          <Select
                size="small"
                value={infoRow.status}
                onChange={(e) => onChange(e.target.value)}
              >
                {statusDecode.map((item,index)=><MenuItem key={index} value={item.value}>{item.prop}</MenuItem>)} 
              </Select>
          </FormControl>
  )
}

export default MainTableStatus