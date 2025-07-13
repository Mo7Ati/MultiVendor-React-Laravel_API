import { memo, useMemo } from 'react'


// File Pond  
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'


import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import axiosClient from '@/axios-client';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import axios from 'axios';
import { FilePondInitialFile } from 'filepond';
import { MediaType } from '@/types/dashboard';


interface Iprops {
    allowMultiple: boolean,
    maxFiles: number,
    files?: MediaType[];
    onChange: (payload: string, type: 'add' | 'revert') => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Pond = memo(function Pond(props: Iprops) {
    return (
        <FilePond
            name="upload"
            allowMultiple={props.allowMultiple}
            maxFiles={props.maxFiles}
            files={props.files?.map(file => ({ source: file.uuid!, options: { type: 'local' } }))}
            server={{
                process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    props.setLoading(true);
                    const formData = new FormData();
                    formData.append(fieldName, file, file.name);
                    const source = axios.CancelToken.source();
                    axiosClient.post('/api/admin/dashboard/upload', formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, Number(e.total));
                            },
                            cancelToken: source.token,
                        }).then(response => {
                            if (response.status >= 200 && response.status < 300) {
                                props.onChange(response.data, 'add');
                                load(response.data);
                            } else {
                                error('oh no');
                            }
                        }).finally(() => props.setLoading(false))

                    return {
                        abort: () => {
                            source.cancel('Upload cancelled by user');
                            abort();
                        },
                    };
                },
                revert: (uniqueFileId, load, error) => {
                    const folderName = uniqueFileId;
                    props.setLoading(true);
                    axiosClient.delete('/api/admin/dashboard/revert', {
                        data: {
                            folder_name: folderName,
                        },
                    }).then((response) => {
                        if (response.status === 200) {
                            props.onChange(response.data, 'revert');
                            load();
                        }
                        else error('Revert failed');
                    })
                        .catch(() => error('Network error'))
                        .then(() => props.setLoading(false));
                },
                load: (source, load, error, progress, abort, headers) => {
                    props.setLoading(true);
                    axiosClient.post('/api/admin/dashboard/load',
                        source,
                        {
                            responseType: 'blob',
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, Number(e.total));
                            },
                        }
                    ).then(res => load(res.data))
                        .catch(res => error('oh my goodness'))
                        .finally(() => props.setLoading(false))
                    return {
                        abort: () => {
                            abort();
                        },
                    };
                },
                remove: (source, load, error) => {
                    props.setLoading(true);
                    axiosClient.delete("api/admin/dashboard/remove", {
                        data: source
                    }).then(res => {
                        load()
                    }).catch(res =>
                        error('oh my goodness')
                    ).then(() => { props.setLoading(false) })
                },
            }}
        />
    )
})

export default Pond;