import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'
import { useNavigation } from '@react-navigation/native'

let db = openDatabase({ name: 'mySql.db' })

const Register = () => {
    const Navigation=useNavigation()
    useEffect(() => {
        createTable()
    }, [])

    const [email, setEmail] = React.useState('')
    const [Password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [address, setAddress] = React.useState('')

    const Validate = () => {
        let valid = true
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || name.length<6||Password.length<6||address.length<6) 
      {
              alert('please enter valid details')  
              valid=false
        
      }

      if(valid)
      {
        AddData()
      }
    



    }

    const AddData = () => {
        db.transaction((txn) => {
            txn.executeSql(
                'insert into user(name,email,address,password) values(?,?,?,?) ;',
                [name, email, address, Password],
                (txn, res) => {
                  Navigation.navigate('login')
                },
                (erro) => {
                    console.log(erro)
                }
            )
        })
    }

    const createTable = () => {

        // 'create table if not created user(Id integer primary key autoincrement',+
        // 'Name varchar(20) not null,Email varchar(20) not null'+
        // 'Password varhcar(20) not null'+
        // 'Adrress varchar(20));',

        db.transaction(txn => {
            txn.executeSql(
                'CREATE TABLE user(' +
                'Id integer primary key autoincrement,' +
                'name varchar(20) not null,' +
                'email varchar(20) unique not null,' +
                'address varchar(30),' +
                'password varchar(20) not null' +
                ');',

                [],
                (txn, res) => {
                    console.log(res)
                },
                (er) => {
                    console.log(er.message)
                }
            )
        })
    }


    return (
        <View style={{ flex: 1 }}>

            <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: "25%", alignSelf: "center" }}>Login</Text>
            <View style={{ paddingHorizontal: 15, borderWidth: 1, marginVertical: "5%", marginHorizontal: "5%", borderRadius: 5 }}>
                <TextInput value={name} onChangeText={(txt) => setName(txt)} placeholder='Enter Name' />
            </View>
            <View style={{ paddingHorizontal: 15, borderWidth: 1, marginVertical: "5%", marginHorizontal: "5%", borderRadius: 5 }}>
                <TextInput value={email} onChangeText={(txt) => setEmail(txt)} placeholder='Enter Email' />

            </View>
            <View style={{ paddingHorizontal: 15, borderWidth: 1, marginVertical: "5%", marginHorizontal: "5%", borderRadius: 5 }}>
                <TextInput value={address} onChangeText={(txt) => setAddress(txt)} placeholder='Enter Address' />

            </View>
            <View style={{ paddingHorizontal: 15, borderWidth: 1, marginVertical: "5%", marginHorizontal: "5%", borderRadius: 5 }}>
                <TextInput value={Password} onChangeText={(txt) => setPassword(txt)} placeholder='Enter Password' />

            </View>

            <TouchableOpacity onPress={() => Validate()} style={{ marginVertical: "5%", padding: '4%', backgroundColor: 'green', marginHorizontal: "5%", borderRadius: 5, alignItems: "center" }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Login</Text></TouchableOpacity>

        </View>
    )
}

export default Register