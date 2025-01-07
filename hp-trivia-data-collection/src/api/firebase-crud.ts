import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { Question } from '../interfaces/question.ts';

const COLLECTION_NAME = 'questions';

export const getRecords = async () => {
    const recordsCollection = collection(db, COLLECTION_NAME);
    const recordsQuery = query(recordsCollection, orderBy('id')); // Ordering by the 'id' field
    const querySnapshot = await getDocs(recordsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any as Question[];
};

export const updateRecord = async (id: string, updatedFields: any) => {
    const recordRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(recordRef, updatedFields);
    console.log('Record updated');
};

export const addRecord = async (newRecord: Question) => {
    await addDoc(collection(db, COLLECTION_NAME), newRecord);
    console.log('Record added');
};