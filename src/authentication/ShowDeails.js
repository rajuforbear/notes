import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
let db = openDatabase({ name: 'mySql.db' })
import { useSelector } from 'react-redux'
const ShowDeails = () => {
  


   const data=useSelector(state=>state. userData)
  return (
    <View style={{ flex: 1 }}>
      <View style={{
        marginTop:"10%",
        paddingVertical: "5%",
        marginHorizontal: "10%",
        backgroundColor: 'white',
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Text style={{fontWeight:"bold",color:'black',fontSize:18}}>Name:- {data.name}</Text>
        <Text style={{fontWeight:"bold",color:'black',fontSize:18}}>email:- {data.email}</Text>
        <Text style={{fontWeight:"bold",color:'black',fontSize:18}}>address:- {data.address}</Text>
        <Text style={{fontWeight:"bold",color:'black',fontSize:18}}>password:- {data.password}</Text>
      </View>
    </View>
  )
}

export default ShowDeails