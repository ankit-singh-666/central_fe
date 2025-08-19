import React, { useState, useEffect } from "react";

const API_FILES_URL = "http://localhost:8000/platform/files"; // Adjust backend URL if needed
const API_DOWNLOAD_URL = "http://localhost:8000/platform/files/download";

function DriveFileSelector() {
    const [files, setFiles] = useState([]);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFiles() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(API_FILES_URL, { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch files");
                const data = await res.json();
                setFiles(data.files);
                setSelectedIds(new Set());
                setSelectAll(false);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchFiles();
    }, []);

    const toggleSelect = (fileId) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(fileId)) {
            newSelected.delete(fileId);
        } else {
            newSelected.add(fileId);
        }
        setSelectedIds(newSelected);
        setSelectAll(newSelected.size === files.length);
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedIds(new Set());
            setSelectAll(false);
        } else {
            setSelectedIds(new Set(files.map((f) => f.id)));
            setSelectAll(true);
        }
    };

    const submitSelected = async () => {
        if (selectedIds.size === 0) {
            alert("Please select at least one file");
            return;
        }
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch(API_DOWNLOAD_URL, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileIds: Array.from(selectedIds) }),
            });

            if (!res.ok) {
                const errorMsg = await res.text();
                throw new Error(errorMsg || "Failed to download files");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "drive_files.zip";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={styles.largeContainer}>
        <div style={styles.container}>
            <h1 style={styles.title}>Google Drive Files</h1>

            {loading && <p style={styles.infoText}>Loading files...</p>}
            {error && <p style={styles.error}>{error}</p>}

            {!loading && (
                <>
                    <div style={styles.selectAllContainer}>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                                style={styles.checkbox}
                            />
                            Select All ({files.length} files)
                        </label>
                    </div>

                    <div style={styles.fileList}>
                        {files.map((file) => (
                            <label key={file.id} style={styles.fileItem}>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.has(file.id)}
                                    onChange={() => toggleSelect(file.id)}
                                    style={styles.checkbox}
                                />
                                <span style={styles.fileName}>
                  {file.mimeType === "application/vnd.google-apps.folder" ? "📁" : "📄"}{" "}
                                    {file.name}
                </span>
                            </label>
                        ))}
                    </div>

                    <button
                        style={{
                            ...styles.submitButton,
                            opacity: submitting ? 0.7 : 1,
                            cursor: submitting ? "not-allowed" : "pointer",
                        }}
                        onClick={submitSelected}
                        disabled={submitting}
                    >
                        {submitting ? "Feeding..." : "Feed the AI"}
                    </button>
                </>
            )}
        </div>
        </div>
    );
}

const bluePurpleGradient = "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)";

const styles = {
    largeContainer: {
        display: "flex",

        minHeight: "100vh",
        maxWidth: "100%",
        borderRadius: 16,
        background: "#cea2fd",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    container: {
        maxWidth: 700,
        margin: "50px auto",
        padding: 25,
        borderRadius: 16,
        background: "#8968cd",
        boxShadow: "0 15px 40px rgba(66, 71, 115, 0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },

    title: {
        color: "#3b3f82",
        textAlign: "center",
        marginBottom: 25,
        fontWeight: "700",
        fontSize: "2.5rem",
        background: bluePurpleGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    infoText: {
        textAlign: "center",
        color: "#555",
        fontStyle: "italic",
    },
    error: {
        color: "#d9534f",
        backgroundColor: "#f8d7da",
        padding: "10px 15px",
        borderRadius: 8,
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "600",
    },
    selectAllContainer: {
        marginBottom: 15,
        fontWeight: "700",
        fontSize: "1.1rem",
        color: "#3b3f82",
    },
    checkboxLabel: {
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        cursor: "pointer",
    },
    fileList: {
        maxHeight: 420,
        overflowY: "auto",
        borderRadius: 12,
        border: "1px solid #a2a5c1",
        backgroundColor: "#fff",
        padding: 18,
        marginBottom: 25,
    },
    fileItem: {
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #e0e3f7",
        fontWeight: "500",
        fontSize: "1rem",
        color: "#40457a",
    },
    fileName: {
        marginLeft: 12,
    },
    submitButton: {
        width: "100%",
        background: bluePurpleGradient,
        border: "none",
        borderRadius: 14,
        padding: "15px 0",
        color: "#fff",
        fontWeight: "700",
        fontSize: "1.2rem",
        boxShadow: "0 8px 25px rgba(75, 108, 183, 0.55)",
        transition: "background-color 0.3s ease",
    },
};

export default DriveFileSelector;
