import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl }
    from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Project, JobAbout, JobFooter, ScreenHeaderBtn }
    from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';


const ProjectDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch('card-details', {
        id: params.id
    })

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        // handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: ''

                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh} />}>
                    {isLoading ?
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        : error ? <Text>Something went wrong</Text>
                            : data.length === 0 ? <Text>No data</Text>
                                : (
                                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                        <Project
                                            logo={data[0].owner.avatar_url}
                                            name={data[0].name}
                                            star={data[0].stargazers_count}
                                            forks={data[0].forks_count}
                                            watchers={data[0].watchers_count}
                                            language={data[0].language}
                                        />

                                        <JobAbout
                                            info={data[0].description ?? "No data provided"} />

                                    </View>
                                )}
                </ScrollView>
                <JobFooter url={data[0]?.html_url}  userUrl={data[0]?.owner.html_url} />
            </>
        </SafeAreaView>
    )
}

export default ProjectDetails