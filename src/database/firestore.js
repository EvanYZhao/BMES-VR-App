import { db } from "../firebase/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Firestore Database API
 */
export default class Database {
   /**
    * Creates a new database
    * @param {String} collectionPath A slash separated path to the collection
    */
   constructor(collectionPath) {
      this.collectionPath = collectionPath;
      this.collectionRef = collection(db, collectionPath);
   }

   /**
    * Stores (and overwrites) the calibration data for the current user
    * @example
    * const calibration_db = new Database('calibrations')
    * storeCalibration('userUID', {extension: -30, flexion: 41})
    *    .then(()=> { console.log("successfully stored calibration data") })
    *    .catch((error) => { console.log(`Error occurred: ${error}`) })
    * @param {String} userUID The current user's unique UID from firebase auth
    * @param {object} data The calibration data in the form of a JSON object 
    * @returns 
    */
   async storeCalibration(userUID, calibration_data) {
      return new Promise(async (resolve, reject) => {
         await setDoc(doc(db, this.collectionPath, userUID), calibration_data)
            .then(() => {
               resolve();
            })
            .catch((error) => {
               reject(error);
            });
      });
   }
}
