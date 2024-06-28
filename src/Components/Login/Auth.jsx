import { StyleSheet, Image, View } from 'react-native'
import React, {useState} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const changeForm = () => {
    setIsLogin(!isLogin)
  }
  
  return (
    <View>
      <Image
        style={styles.logo}
        source={require('../../../assets/adaptive-icon.png')}
      />
      {isLogin ? <LoginForm changeForm={changeForm}/> : <RegisterForm changeForm={changeForm}/>}
    </View>
  )
}

export default Auth

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
  }
})