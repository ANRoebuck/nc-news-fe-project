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

export const getArticleById = async (article_id) => {
    const { data : { article }} = await axios.get(apiUrl + `articles/${article_id}`);
    return article;
};

export const getArticleComments = async (article_id) => {
    const { data : { comments }} = await axios.get(apiUrl + `articles/${article_id}/comments`);
    return comments;
};