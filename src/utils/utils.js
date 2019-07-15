import axios from "axios";

const apiUrl = 'https://fantastic-news-api.herokuapp.com/api/';

export const getTopics = async () => {
    const { data : { topics }} = await axios.get(apiUrl + 'topics');
    return topics;
};

export const getArticles = async (topic) => {
    const { data : { articles }} = await axios.get(apiUrl + 'articles', { params : { topic }});
    return articles;
};