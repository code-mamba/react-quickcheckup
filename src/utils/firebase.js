import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCMntZAFwGK5rkysdzoJd3-_RUuotARyts",

    authDomain: "react-firebase-storage-205af.firebaseapp.com",
  
    projectId: "react-firebase-storage-205af",
  
    storageBucket: "react-firebase-storage-205af.appspot.com",
  
    messagingSenderId: "104503601837",
  
    appId: "1:104503601837:web:df175c83eb8181b3337424"
  
}

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)