import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [driveLink, setDriveLink] = useState("");
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    if (!driveLink.trim()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("drive_links", driveLink);

      const res = await axios.post("http://localhost:8000/preview/drive", formData);
      setFiles(res.data.files || []);
      setSelected([]);
    } catch (err) {
      alert("Error fetching files: " + err.message);
    }
    setLoading(false);
  };

  const toggleFile = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === files.length) {
      setSelected([]);
    } else {
      setSelected(files.map((f) => f.id));
    }
  };

const uploadSelected = async () => {
  if (selected.length === 0) {
    alert("No files selected!");
    return;
  }

  const fileUrls = files
    .filter((f) => selected.includes(f.id))
    .map((f) => f.url);

  setLoading(true);
  try {
    console.log("The file urls are", fileUrls);

    // ✅ Create FormData
    const formData = new FormData();
    fileUrls.forEach((url) => formData.append("drive_links", url)); 
    formData.append("collection_name", "drive_docs"); // optional

    // ✅ Send as multipart/form-data
    const res = await axios.post("http://localhost:8000/build/drive", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Uploaded successfully: " + JSON.stringify(res.data));
  } catch (err) {
    alert("Upload failed: " + err.message);
  }
  setLoading(false);
};

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        📂 Google Drive Uploader
      </h1>

      {/* Input */}
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Paste Google Drive folder or file link..."
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          style={{
            width: "70%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={fetchFiles}
          disabled={loading}
          style={{
            padding: "10px 18px",
            backgroundColor: "#1d4ed8",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Fetching..." : "Preview"}
        </button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div
          style={{
            background: "white",
            color: "black",
            borderRadius: "12px",
            padding: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <h2 style={{ margin: 0 }}>Files ({files.length})</h2>
            <button
              onClick={toggleAll}
              style={{
                padding: "6px 12px",
                backgroundColor: "#e5e7eb",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {selected.length === files.length ? "Unselect All" : "Select All"}
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {files.map((file) => (
              <li
                key={file.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  padding: "8px 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={selected.includes(file.id)}
                    onChange={() => toggleFile(file.id)}
                    style={{ marginRight: "10px" }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>{file.name}</p>
                    <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                      {file.type} • {Math.round(file.size / 1024)} KB •{" "}
                      {new Date(file.modified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2563eb", textDecoration: "underline" }}
                >
                  Open
                </a>
              </li>
            ))}
          </ul>

          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <button
              onClick={uploadSelected}
              disabled={loading || selected.length === 0}
              style={{
                padding: "10px 18px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                opacity: selected.length === 0 ? 0.6 : 1,
              }}
            >
              {loading
                ? "Uploading..."
                : `Upload Selected (${selected.length})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
