import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { Question } from '../interfaces/question.ts';

const COLLECTION_NAME = 'questions';

const getRecords = async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(records);
    return records;
};

const updateRecord = async (id: string, updatedFields: any) => {
    const recordRef = doc(db, 'records', id);
    await updateDoc(recordRef, updatedFields);
    console.log('Record updated');
};

const addRecord = async (newRecord: Question) => {
    await addDoc(collection(db, 'records'), newRecord);
    console.log('Record added');
};