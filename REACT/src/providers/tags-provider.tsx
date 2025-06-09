import axiosClient from "@/axios-client";
import tagsReducer, { IAction } from "@/reducers/tags-reducer";
import { TagType } from "@/types/dashboard";
import { useReducer, createContext, useState } from "react";


interface ITagContext {
    tags: TagType[],
    tagsLoaded: boolean,
    setTagsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    getTags: () => Promise<void>,
    dispatch: React.ActionDispatch<[action: IAction]>,
}


export const tagsContext = createContext<ITagContext>(
    {
        tags: [],
        tagsLoaded: false,
        dispatch: () => { },
        setTagsLoaded: () => { },
        getTags: () => new Promise(() => { }),
    });

export const TagsProvider = ({ children }: { children: React.ReactNode }) => {
    const getTags = async () => {
        try {
            const response = await axiosClient.get('/api/admin/dashboard/tags')
            dispatch({ type: "INITIAL_STATE", payload: response.data.tags });
            setTagsLoaded(true);
        } catch (error) {
            throw error;
        }
    }

    const [tags, dispatch] = useReducer(tagsReducer, []);
    const [tagsLoaded, setTagsLoaded] = useState<boolean>(false);
    const [flashMessage, setFlashMessage] = useState<string>('');

    return (
        <tagsContext.Provider value={{
            tags,
            tagsLoaded,
            getTags,
            dispatch,
            setTagsLoaded,
        }}>
            {children}
        </tagsContext.Provider>
    );
}

