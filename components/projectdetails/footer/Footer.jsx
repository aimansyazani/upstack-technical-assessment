import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'


import Ionicons from '@expo/vector-icons/Ionicons';

const Footer = ({ url,userUrl }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}
        onPress={() => Linking.openURL(userUrl)}>
        {/* <Image source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage} /> */}
          <Ionicons name='logo-github' size={35} color='black' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Go to Project</Text>
      </TouchableOpacity> 
    </View >
  )
}

export default Footer