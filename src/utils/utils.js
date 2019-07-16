import axios from "axios";

const apiUrl = 'https://fantastic-news-api.herokuapp.com/api/';

export const getTopics = async () => {
    const { data : { topics }} = await axios.get(apiUrl + 'topics');
    return topics.sort(function (a, b) {
        if (a.slug < b.slug) return -1;
        if (a.slug > b.slug) return 1;
        return 0;
    });
};

export const getArticles = async (args) => {
    const { data : { articles }} = await axios.get(apiUrl + 'articles', { 
        params : { 
            topic: args.topic,
            author: args.author 
        }
    });
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

export const postComment = async (newComment, article_id) => {
    const { data : { comment }} = await axios.post(apiUrl + `articles/${article_id}/comments`, { ...newComment });
    return comment;
};

export const deleteComment = async (comment_id) => {
    const { data } = await axios.delete(apiUrl + `comments/${comment_id}`);
    return data;
};

export const patchComment = async (comment_id, vote) => {
    const { data } = await axios.patch(apiUrl + `comments/${comment_id}`, { inc_votes: vote});
    return data;
};

export const formatDate = date => {
    const day = date.slice(8,10);
    const month = date.slice(5,7);
    const year = date.slice(0,4);
    const time = date.slice(11,16);
    return `${day}/${month}/${year} ${time}`;
};