import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import styles from './files.module.css';  // Import the CSS module
import { FaDownload, FaUpload, FaFile, FaTrash } from 'react-icons/fa';

function Files() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedListFile, setSelectedListFile] = useState(null);
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

    const handleFileSelect = (file) => {
        setSelectedListFile(file);
    };

    const handleDownload = async () => {
        if (selectedListFile) {
            const url = await getUrl(selectedListFile.name, bucket);
            if (url) {
                window.open(url, '_blank');
            }
        }
    };

    useEffect(() => {
        listAllFiles(bucket);
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>{bucket} Bucket</h2>
                <ul className={styles.fileList}>
                    {files.map((file) => (
                        <li 
                            key={file.id} 
                            className={`${styles.fileItem} ${selectedListFile === file ? styles.selected : ''}`}
                            onClick={() => handleFileSelect(file)}
                        >
                            <FaFile className={styles.fileIcon} />
                            <span className={styles.fileName}>{file.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.uploadSection}>
                    <input type="file" onChange={handleFileChange} className={styles.fileInput} />
                    <button onClick={handleUpload} disabled={!selectedFile} className={styles.uploadButton}>
                        <FaUpload />
                    </button>
                </div>
                <div className={styles.fileDetails}>
                    <h3>File Details</h3>
                    {selectedListFile ? (
                        <div>
                            <p><strong>Name:</strong> {selectedListFile.name}</p>
                            <p><strong>Size:</strong> {(selectedListFile.metadata.size / 1024).toFixed(2)} KB</p>
                            <p><strong>Created:</strong> {new Date(selectedListFile.created_at).toLocaleString()}</p>
                            <p><strong>Last Modified:</strong> {new Date(selectedListFile.updated_at).toLocaleString()}</p>
                        </div>
                    ) : (
                        <p>No file selected</p>
                    )}
                </div>
                {selectedListFile ? (
                    <button 
                        className={styles.downloadButton} 
                        onClick={handleDownload} 
                        disabled={!selectedListFile}
                    >
                        <FaDownload /> Download Selected File
                    </button>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}

export default Files;