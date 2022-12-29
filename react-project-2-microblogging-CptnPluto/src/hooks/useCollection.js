import { useState, useEffect } from "react";
import { db } from "../firebase/config";

// Firebase imports
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

//------------------//

export const useCollection = (c) => {
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        let ref = collection(db, c);

        const q = query(ref, orderBy("date", "desc"));

        const unsub = onSnapshot(q, (snapshot) => {
            let results = [];
            snapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setDocuments(results);
        });

        return () => unsub;
    }, [c]);

    return { documents };
};
