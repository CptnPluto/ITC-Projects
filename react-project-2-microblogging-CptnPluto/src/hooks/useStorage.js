import { storage } from "../firebase/config";

//Firebase imports
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

//------------------//

export const useStorage = () => {
    const upload = async (file, user) => {
        const fileRef = ref(storage, "profileImgs/" + user.uid + ".png");

        await uploadBytes(fileRef, file);

        const photoURL = await getDownloadURL(fileRef);

        updateProfile(user, {
            photoURL,
        });

        alert("Uploaded file! Refresh to see changes.");

        //Return the useable URL string to set in local state.
        return photoURL;
    };

    return { upload };
};
