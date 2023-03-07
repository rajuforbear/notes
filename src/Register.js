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

let db = openDatabase({ name: 'useData.db' })
const Register = () => {

  const Navigation=useNavigation()

  useEffect(() => {
    createTable()
  }, [])




  const createTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_eamil varchar(20), user_address VARCHAR(255))',
              []
            );
          }
          else {
            console.log("table already exist")
          }
        }

      );
    });
  }

 




  const [Inputs, setInpusts] = useState({
    name: '',
    address: '',
    email: ''
  })
 const handleOnPress = () => { // 'INSERT INTO    user( user_name , user_eamil , user_address ) VALUES (?,?,?);
    db.transaction(txn=>{
      txn.executeSql(
        'INSERT INTO    user( user_name , user_eamil , user_address ) VALUES (?,?,?);',
        [Inputs.name,Inputs.email,Inputs.address],
        (tx,res)=>{
           if(res.rowsAffected==1)
           {
             Navigation.navigate('getData')
           }
        },
        
       
      
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

export default Register