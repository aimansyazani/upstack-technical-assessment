import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import axios from 'axios'

import { ScreenHeaderBtn, ProjectCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'


const ProjectSearch = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://api.github.com/orgs/react-native-community/repos`,
    };

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])
        try {
            const response = await axios.request
                (options);
            if (params.id) {
                filteredData = response.data.filter(item =>
                    item.name.toLowerCase().includes(params.id.toLowerCase())
                );
                setSearchResult(filteredData);
            }
        } catch (error) {
            setSearchError(error);
        } finally {
            setSearchLoader(false);
        }
    };

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (

                    <ProjectCard
                        data={item}
                        handleNavigate={() => router.push(`/card-details/${item.id}`)}
                    />


                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Project Search</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}

                            {searchResult.length == 0 && searchLoader != true ?
                                <Text>Nothing was found in here</Text>
                                : ""}
                        </View>
                    </>
                )}
            />

        </SafeAreaView>
    )
}

export default ProjectSearch