import { useState, useEffect } from 'react';
import axios from 'axios';
// Assuming you have some mock data for now.

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const GITHUB_API_TOKEN = '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';
    const headers = {
        'Authorization': `token ${GITHUB_API_TOKEN}`
    };


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const options = {
                method: 'GET',
                url: `https://api.github.com/orgs/react-native-community/repos`,
                headers: headers,
            };

            const response = await axios.request(options);

            const totalPages = Math.ceil(response.data.length / perPage);
            setTotalPages(totalPages);

            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = response.data.slice(startIndex, endIndex);
            setData(paginatedData);

            if (query && query.id) {
                filteredData =  response.data.filter(item => item.id == query.id);
                setData(filteredData);
            }

            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error!');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, perPage]);

    const refetch = (pageNumber) => {
        setPage(pageNumber);
    };

    return { data, isLoading, error, refetch, totalPages, setPage, setPerPage };
};

export default useFetch;
