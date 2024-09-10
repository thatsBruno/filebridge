import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

function Files() {
    const [files, setFiles] = useState([]);
    let bucket: string = 'avatars';

    // create a bucket.
    async function createBucket(bucketName: string) {
        bucket = bucketName;
        const { data, error } = await supabase.storage.createBucket(bucketName, {
            public: true, // default: false
        })
        console.log(data, error);
    }
    createBucket(bucket);

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
            .list('folder', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            })
        console.log(data, error);
    }

    // async function deleteFile(bucket: string, fileName: string) {
    //     const { data, error } = await supabase
    //         .storage
    //         .from(bucket)
    //         .remove([fileName])
    //     console.log(data, error);
    // }

    // async function getUrl(fileName: string, bucket: string) {
    //     const { data } = supabase.storage.from(bucket).createSignedUrl(fileName, 3600)
    //     if (data) {
    //         console.log(data.signedUrl)
    //     }
    //     return data.publicUrl
    // }

    useEffect(() => {
        listAllFiles(bucket);
    }, [bucket]);

    return (
        <>
        // list the files
        console.log(files);
        <ul>
            {files.map((file) => (
                <li key={file}>{file}</li>
            ))}
        </ul>
        </>
    );
}

export default Files;