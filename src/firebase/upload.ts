import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImageAndGetUrl = async (file: File): Promise<string> => {
  const fileRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
};
