const KARYA_FILE_LIMIT_MB = 5;
const KARYA_FILE_FORMATS = {
  jpg: { type: "image/jpeg", signature: [0xff, 0xd8, 0xff] },
  png: { type: "image/png", signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  pdf: { type: "application/pdf", signature: [0x25, 0x50, 0x44, 0x46, 0x2d] }
};

async function validateKaryaFile(file) {
  const extension = /\.([^.]+)$/.exec(file.name.toLowerCase())?.[1];
  const format = KARYA_FILE_FORMATS[extension === "jpeg" ? "jpg" : extension];
  if (!format?.signature) {
    throw new Error(`"${file.name}" harus berformat JPG, PNG, atau PDF.`);
  }
  if (file.size > KARYA_FILE_LIMIT_MB * 1024 * 1024) {
    throw new Error(`"${file.name}" melebihi batas ${KARYA_FILE_LIMIT_MB} MB per file.`);
  }
  const header = new Uint8Array(await file.slice(0, format.signature.length).arrayBuffer());
  if (!format.signature.every((byte, index) => header[index] === byte)) {
    throw new Error(`Isi file "${file.name}" tidak sesuai dengan formatnya.`);
  }
  return format.type;
}

async function karyaFileRequest(mode, requestFile) {
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open("bengkod_karya_files", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("attachments");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction("attachments", mode);
      const request = requestFile(transaction.objectStore("attachments"));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}

async function downloadKaryaAttachment(projectId, index, attachment) {
  const files = await karyaFileRequest("readonly", store => store.get(projectId));
  const file = files?.[index];
  if (!file) throw new Error("Lampiran tidak ditemukan.");
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = attachment.name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
