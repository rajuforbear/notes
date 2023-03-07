import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { FlatList } from 'react-native'
import { StyleSheet } from 'react-native'
import { useNavigation,useIsFocused, useFocusEffect } from '@react-navigation/native'
let db = openDatabase({ name: 'useData.db' })
import { useDispatch,useSelector } from 'react-redux'
import { dataToupdate } from './ReduxTollkit/Slice'
const ShowData = () => {
    const isFocused=useIsFocused()
    const Navigation = useNavigation()
    const dispatch = useDispatch()
    const [data,setData]=useState()
    const [count,setCount]=useState(0)
    useEffect(() => {
       
        datashow()
    },[isFocused])
    const datashow = async() => {
       db.transaction((txn => {
            txn.executeSql(
                'select * from user',
                [],
               (txn, res) => {
                    let arr = []
                    for (let i = 0; i < res.rows.length; i++) {

                        arr.push(res.rows.item(i))
                    }
                    setData(arr)
                    let count=0
                   // console.log(count++)
                },
                (err) => {
                    console.log(err)
                }
            )
        }))
    }

    console.log('rj')

    const update = (item) => {
        dispatch(dataToupdate(item))
        Navigation.navigate('updateData')
    }
    const deleteData=(id)=>{
        db.transaction((txn)=>{
            txn.executeSql(
                'delete from user where user_id=?',
                [id],
                (tx,res)=>{
                   datashow()
                },
                (err)=>{
                    console.log(err)

                }
            )
        })
    }



    return (
        <View style={{ flex: 1 }}>
           
                {
                  data!=undefined&&<FlatList
                    data={data}
                    renderItem={({item})=>{
                        return (
                            <View style={{ backgroundColor: 'white', paddingVertical: "4%", elevation: 5, borderRadius: 10, paddingHorizontal: "5%", marginHorizontal: "5%", marginTop: "5%" }}>
                                <Text style={{ fontSize: 17, color: 'black' }}>Name:- {item.user_name}</Text>
                                <Text style={{ fontSize: 17, color: 'black' }}>Email:-{item.user_eamil}</Text>
                                <Text style={{ fontSize: 17, color: 'black' }}>Address:{item.user_address}</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: "15%", marginTop: "5%" }}>
                                    <TouchableOpacity style={{ padding: "5%", backgroundColor: 'red', marginTop: "5%", borderRadius: 4 }}  onPress={()=>{deleteData(item.user_id)}}><Text style={{ color: 'white', fontWeight: 'bold' }}>DELETE</Text></TouchableOpacity>
                                    <TouchableOpacity style={{ padding: "5%", backgroundColor: 'skyblue', marginTop: "5%", borderRadius: 4 }} onPress={() => { update(item) }}><Text style={{ color: 'white', fontWeight: 'bold' }}>UPDATE</Text></TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                  />
                  
                }
         
            <TouchableOpacity onPress={() => Navigation.navigate('Register')} style={styles.btn}><Text style={styles.text}>ADD DATA</Text></TouchableOpacity>
        </View>
    )
}

export default ShowData
const styles = StyleSheet.create({
    btn: {
        height: "6%",
        width: '30%',
        backgroundColor: "green",
        position: "absolute",
        bottom: '5%',
        right: "5%",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 17,
    }
})