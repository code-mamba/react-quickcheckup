import {storage} from "src/utils/firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const FileUpload = async (file, setValues) =>{
    const storageRef = ref(storage, `file/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try{
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        setValues((value)=>({...value, imgUrl: downloadUrl}))
    }
    catch(error){
        throw error
    }
}
export default FileUpload