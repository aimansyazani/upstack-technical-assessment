import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './projectcard'

import { checkImageURL } from '../../../utils';


const ProjectCard = ({ data, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(data.owner.avatar_url + '.jpg') ?
              data.owner.avatar_url :
              "https://t4.ftcdn.net/jpg/05/05/61/73/ƒ360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.projectName}  numberOfLines={1} >
          {data.name}
        </Text>
        <Text style={styles.projectDescription} numberOfLines={2}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProjectCard