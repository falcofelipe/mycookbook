import axios from 'axios';

export const uploadImage = async formData => {
  const uploadedImage = await axios.post('/api/upload', formData);
  return uploadedImage.data;
};
