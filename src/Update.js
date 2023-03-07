import React, { useEffect, useState } from 'react'
import {
  TextInput,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

let db = openDatabase({ name: 'useData.db' })
const UpdateData = () => {
  const [Inputs, setInpusts] = useState({
    name: '',
    address: '',
    email: '',
    id:0
  })
  const Navigation = useNavigation()
  const prevData = useSelector(state => state.useData)
  useEffect(() => {
    setInpusts(prevstate => ({ ...prevstate, ['name']: prevData.user_name }))
    setInpusts(prevstate => ({ ...prevstate, ['email']: prevData.user_eamil }))
    setInpusts(prevstate => ({ ...prevstate, ['address']: prevData.user_address }))
    setInpusts(prevstate => ({ ...prevstate, ['id']: prevData.user_id }))
  }, [])

  const handleOnPress = () => { // 'INSERT INTO    user( user_name , user_eamil , user_address ) VALUES (?,?,?);
    db.transaction(txn => {
      txn.executeSql(
        "UPDATE user SET user_name=?, user_address= ?,user_eamil=? WHERE user_id=? ;",
        [Inputs.name, Inputs.address,Inputs.email,Inputs.id],
        (tx, res) => {
          if (res.rowsAffected == 1) {
            Navigation.navigate('getData')
          }
         
        },
        (err)=>{
               console.log(err)
        }
      )
    })

  }
 

  const handleInput = (text, input) => {

    setInpusts(prevstate => ({ ...prevstate, [text]: input }))

  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView>
          <StatusBar backgroundColor={'skyblue'} />
          <Text style={{
            fontSize: 45,
            fontWeight: 'bold',
            margin: "20%",
            color: "green"
          }}
          >Register...</Text>
          <Text style={{
            marginLeft: "5%",
            marginTop: "1%",
            marginBottom: "2%",
            fontSize: 18,
            color: 'green'
          }}
          >Full Name</Text>
          <View style={{
            borderWidth: 1,
            marginHorizontal: "5%",
            borderRadius: 7, borderColor: "green",
            paddingHorizontal: "5%"
          }}>
            <TextInput placeholder='Enter your name'
              style={{ fontSize: 16 }}
              placeholderTextColor='green'
              value={Inputs.name}
              onChangeText={(input) => handleInput('name', input)}
            />
          </View>
          <Text style={{
            marginLeft: "5%",
            marginTop: "5%",
            marginBottom: "2%",
            fontSize: 18,
            color: 'green'
          }}
          >Address</Text>
          <View style={{
            borderWidth: 1,
            marginHorizontal: "5%",
            borderRadius: 7,
            borderColor: "green",
            paddingHorizontal: "5%"
          }}
          >
            <TextInput style={{ fontSize: 16 }}
              placeholder='Enter your address'
              value={Inputs.address}
              placeholderTextColor='green'
              onChangeText={(input) => handleInput('address', input)}
            />
          </View>
          <Text style={{
            marginLeft: "5%",
            marginTop: "5%",
            marginBottom: "2%",
            fontSize: 18, color: "green"
          }}
          >Email</Text>
          <View style={{
            borderWidth: 1,
            marginHorizontal: "5%",
            borderRadius: 7,
            borderColor: "green",
            paddingHorizontal: "5%"
          }}>
            <TextInput style={{ fontSize: 16 }}
              value={Inputs.email}
              placeholderTextColor='green'
              placeholder='Enter your email'
              onChangeText={(input) => handleInput('email', input)}
            />
          </View>
          <TouchableOpacity style={{
            marginHorizontal: "5%",
            backgroundColor: 'green',
            paddingVertical: "4%",
            marginVertical: "10%",
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 7,
            elevation: 1
          }}
            onPress={() => { handleOnPress() }}

          >
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white'
            }}
            >SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default UpdateData