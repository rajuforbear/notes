import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { openDatabase } from 'react-native-sqlite-storage'
let db = openDatabase({ name: 'mySql.db' })
import { useDispatch } from 'react-redux'
import { addData } from './ReduxToolkit/Slice'

const LoginPage = ({navigation}) => {
  
   const dispatch=useDispatch()

   const [email, setEmail] = React.useState('')
   const [Password, setPassword] = React.useState('')

   const vaildation = () => {
      db.transaction(txn => {
         txn.executeSql(
            'select * from user where email=? and password=?;',
            [email, Password],
            (txn, res) => {
               if (res.rows.item(0) === undefined) {
                  alert('Email or password incorect')
               }
               else {
                  alert('Login Success')
                  setTimeout(() => {
                     dispatch(addData(res.rows.item(0)))

                     navigation.navigate('getData')
                  }, 2000)

               }
            },
            (er) => {
               console.log(er)
            }
         )
      })
   }
   return (
      <View style={{ flex: 1 }}>

         <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: "25%", alignSelf: "center" }}>Login</Text>
         <View style={{ paddingHorizontal: 15, borderWidth: 1, marginVertical: "10%", marginHorizontal: "5%", borderRadius: 5 }}>
            <TextInput value={email} onChangeText={(txt) => setEmail(txt)} placeholder='Enter Email' />
         </View>
         <View style={{ paddingHorizontal: 15, borderWidth: 1, marginVertical: "10%", marginHorizontal: "5%", borderRadius: 5 }}>
            <TextInput value={Password} onChangeText={(txt) => setPassword(txt)} placeholder='Enter Password' />

         </View>
         <TouchableOpacity onPress={() => vaildation()} style={{ marginVertical: "10%", padding: '4%', backgroundColor: 'green', marginHorizontal: "5%", borderRadius: 5, alignItems: "center" }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Login</Text></TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{ alignSelf: "center", fontWeight: 'bold', fontSize: 18 }}>Create new account</Text></TouchableOpacity>
      </View>
   )
}

export default LoginPage