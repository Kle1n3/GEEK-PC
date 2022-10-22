import { deleteArticleApi, getChannelsApi } from "../../api/article";
import { setArticlesApi, addArticleApi, getArticleInfoApi } from "../../api/article";

export const getChannels = () => {
    return async dispatch => {
        const data = await getChannelsApi()
        dispatch({ type: 'article/getChannels', payload: data.channels })
    }
}

export const setArticles = (params) => {
    return async dispatch => {
        const data = await setArticlesApi(params)
        dispatch({ type: 'article/setArticles', payload: data })
    }
}

export const deleteArticle = id => {
    return async dispatch => {
        await deleteArticleApi(id)
    }
}

export const addArticle = (data, draft) => {
    return async dispatch => {
        await addArticleApi(data, draft)
    }
}

export const getArticleInfo = id => {
    return async dispatch => {
        const data = await getArticleInfoApi(id)
        return data
    }
}