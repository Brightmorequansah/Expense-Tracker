import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useEditTransaction = () => {
  const editTransaction = async (transactionID, updatedTransaction) => {
    const transactionDocRef = doc(db, "transactions", transactionID);

    try {
      await updateDoc(transactionDocRef, {
        ...updatedTransaction,
        updatedAt: serverTimestamp(),
      });
      console.log("Transaction updated successfully");
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  };

  return { editTransaction };
};
