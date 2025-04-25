import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteTransaction = () => {
  const deleteTransaction = async (transactionID) => {
    const transactionDocRef = doc(db, "transactions", transactionID);

    try {
      await deleteDoc(transactionDocRef);
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  return { deleteTransaction };
};
