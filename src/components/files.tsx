import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

function Files() {
    const [files, setFiles] = useState([]);
    let bucket = 'user-files';

    // create a bucket.
    // async function uploadFile(file: File) {
    //     const { data, error } = await supabase.storage
    //         .from(bucket)
    //         .upload(file.name, file)
    //     console.log(data, error);
    // }

    async function listAllFiles(bucket: string) {
        const { data, error } = await supabase
            .storage
            .from(bucket)
            .list('', {  // Changed 'folder' to '' to list files in the root
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            })
        
        if (error) {
            console.error('Error fetching files:', error);
        } else {
            setFiles(data || []);  // Update the state with the fetched files
        }
    }

    // async function deleteFile(bucket: string, fileName: string) {
    //     const { data, error } = await supabase
    //         .storage
    //         .from(bucket)
    //         .remove([fileName])
    //     console.log(data, error);
    // }

    async function getUrl(fileName: string, bucket: string): Promise<string | null> {
        const { data, error } = await supabase.storage.from(bucket).createSignedUrl(fileName, 3600)
        if (data) {
            console.log(data.signedUrl)
            return data.signedUrl
        }
        if (error) {
            console.error('Error creating signed URL:', error)
        }
        return null
    }

    useEffect(() => {
        listAllFiles(bucket);
    }, []);

    return (
        <>
            <h2>Files in {bucket} bucket:</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        {file.name}
                        <button onClick={async () => {
                            const url = await getUrl(file.name, bucket)
                            if (url) {
                                window.open(url, '_blank')
                            }
                        }}>Download file</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Files;