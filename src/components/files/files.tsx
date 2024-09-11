import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import styles from './files.module.css';  // Import the CSS module
import { FaDownload, FaUpload } from 'react-icons/fa';

function Files() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    let bucket = 'user-files';

    // create a bucket.
    async function uploadFile(file: File) {
        const { data, error } = await supabase.storage
        .from(bucket)
            .upload(file.name, file)
        console.log(data, error);
    }

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


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            await uploadFile(selectedFile);
            listAllFiles(bucket); // Refresh the file list after upload
            setSelectedFile(null);
        }
    };

    useEffect(() => {
        listAllFiles(bucket);
    }, []);

    return (
            <div className={styles.filesContainer}>
                <h2 className={styles.title}>Files in {bucket} bucket:</h2>
                <div className={styles.uploadSection}>
                    <input type="file" onChange={handleFileChange} className={styles.fileInput} />
                    <button onClick={handleUpload} disabled={!selectedFile} className={styles.uploadButton}>
                        <FaUpload /> Upload File
                    </button>
                </div>
                <ul className={styles.fileList}>
                    {files.map((file) => (
                        <li key={file.id} className={styles.fileItem}>
                            {file.name}
                            <button 
                                onClick={async () => {
                                    const url = await getUrl(file.name, bucket)
                                    if (url) {
                                        window.open(url, '_blank')
                                    }
                                }}
                                className={styles.downloadButton}
                            >
                                <FaDownload /> Download
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default Files;