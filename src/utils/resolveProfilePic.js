const DEFAULT_CONTENT_TYPE = "image/jpeg";

const isProbablyBase64 = (value) => {
  if (!value || typeof value !== "string") {
    return false;
  }
  const normalized = value.trim();
  if (!normalized || normalized.length % 4 !== 0) {
    return false;
  }
  return /^[A-Za-z0-9+/]+={0,2}$/.test(normalized);
};

const toBase64FromArray = (dataArray) => {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return "";
  }
  let binary = "";
  dataArray.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const resolveProfilePic = (profilePicValue, fallbackContentType = DEFAULT_CONTENT_TYPE) => {
  if (!profilePicValue) {
    return "";
  }

  if (typeof profilePicValue === "string") {
    const trimmed = profilePicValue.trim();
    if (!trimmed) {
      return "";
    }
    if (/^(data:|https?:|\/)/.test(trimmed)) {
      return trimmed;
    }
    if (isProbablyBase64(trimmed)) {
      return `data:${fallbackContentType};base64,${trimmed}`;
    }
    return trimmed;
  }

  const contentType = profilePicValue.contentType || profilePicValue.type || fallbackContentType;
  const rawData = profilePicValue.data ?? profilePicValue.buffer ?? "";

  if (!rawData) {
    return "";
  }

  if (typeof rawData === "string") {
    return rawData ? `data:${contentType};base64,${rawData}` : "";
  }

  if (Array.isArray(rawData)) {
    const base64Value = toBase64FromArray(rawData);
    return base64Value ? `data:${contentType};base64,${base64Value}` : "";
  }

  if (Array.isArray(rawData?.data)) {
    const base64Value = toBase64FromArray(rawData.data);
    return base64Value ? `data:${contentType};base64,${base64Value}` : "";
  }

  return "";
};

export default resolveProfilePic;
