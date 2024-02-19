import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/utils/firebase'

export const FileUpload = async (file, setValues) => {
	const storageRef = ref(storage, `file/${file.name}`)
	const uploadTask = uploadBytesResumable(storageRef, file)
	const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
	setValues((value) => ({ ...value, imgUrl: downloadUrl }))
}
export default FileUpload
