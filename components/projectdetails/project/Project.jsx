import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './project.style'
import { icons } from '../../../constants'
import { checkImageURL } from '../../../utils'

import Ionicons from '@expo/vector-icons/Ionicons';

const Project = ({ logo, name, star, forks, watchers, language }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(logo + '.jpg') ?
              logo : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.projectTitleBox}>
        <Text style={styles.projectTitle}>{name}</Text>
      </View>


      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}><Ionicons name='md-star-outline' size={15} color='black' /> {star} / </Text>
        <Text style={styles.companyName}><Ionicons name='git-network-outline' size={15} color='black' /> {forks} / </Text>
        <Text style={styles.companyName}><Ionicons name='md-eye-outline' size={15} color='black' /> {watchers} / </Text>
        <Text style={styles.companyName}><Ionicons name='ellipse' size={10} color='blue' /> {language}</Text>
      </View>
    </View>





  )
}

export default Project