import http from "../request";

export const getChannelsApi = () => http({
    method: 'GET',
    url: '/channels'
})

export const setArticlesApi = params => http({
    url: '/mp/articles',
    params
})

export const deleteArticleApi = id => http({
    url: '/mp/articles/' + id,
    method: 'DELETE'
})

export const addArticleApi = (data, draft = false) => http({
    url: '/mp/articles?draft=' + draft,
    method: 'POST',
    data
})

export const getArticleInfoApi = id => http({
    url: '/mp/articles/' + id,
    method: 'GET',
})