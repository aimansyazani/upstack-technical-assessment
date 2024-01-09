import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS, icons } from '../../../constants';
import ProjectCard from '../../common/cards/ProjectCard';
import useFetch from '../../../hook/useFetch';
import styles from './projects';

const Projects = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, totalPages } = useFetch(); 

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(prevPage => prevPage - 1);
    } else if (direction === 'right' && page < totalPages) { 
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    refetch(page);
  }, [page]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>React Native Community</Text>
        {/* <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something occurred</Text>
        ) : (
          <>
            {data?.map((item) => (
              <ProjectCard
                data={item}
                key={`nearby-card-${item?.id}`}
                handleNavigate={() => router.push(`/card-details/${item.id}`)}
              />
            ))}

            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('left')}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('right')}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

          </>
        )}
      </View>
    </View>
  );
};

export default Projects;
