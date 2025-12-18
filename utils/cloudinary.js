export async function uploadToCloudinaryUnsigned(file, { folder } = {}) {
  console.log(
    "Cloudinary ENV CHECK →",
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
  if (!file) throw new Error("No file provided");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env vars missing");
  }

  // Basic client-side validation (optional but recommended)
  const allowedTypes = [
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Unsupported file type");
  }
  const maxSizeBytes = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSizeBytes) {
    throw new Error("File too large (max 10 MB)");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (folder) formData.append("folder", folder);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary upload error:", data);
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  // data.secure_url is the public HTTPS URL
  return data.secure_url;
}
