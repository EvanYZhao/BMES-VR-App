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
    * calibration_db.storeCalibration('userUID', {extension: -30, flexion: 41})
    *    .then(()=> { console.log("successfully stored calibration data") })
    *    .catch((error) => { console.log(`Error occurred: ${error}`) })
    * @param {String} userUID The current user's unique UID from firebase auth
    * @param {object} data The calibration data in the form of a JSON object
    * @returns {Promise}
    */
   async storeCalibration(userUID, calibration_data) {
      return new Promise(async (resolve, reject) => {
         const docRef = doc(db, this.collectionPath, userUID);
         setDoc(docRef, calibration_data)
            .then(() => {
               resolve("Successfully set calibration data!");
            })
            .catch((error) => {
               reject(error);
            });
      });
   }

   /**
    * Gets calibration data for the current user if it exists
    * @example 
    * const calibration_db = new Database('calibrations')
    * calibration_db.getCalibration('userUID')
    *    .then((data) => console.log("Calibration data received:", data))
    *    .catch((error) => console.log("Error occurred retrieving calibration data:", error))
    * @param {String} userUID The current user's unique UID from firebase auth
    * @returns {Promise}
    */
   async getCalibration(userUID) {
      return new Promise(async (resolve, reject) => {
         const docRef = doc(db, this.collectionPath, userUID);
         getDoc(docRef)
            .then((data) => {
               if (data.exists()) {
                  resolve(data.data())
               } else {
                  reject("Data does not exist")
               }
            })
            .catch((error) => {
               reject(error);
            });
      });
   }
}

export const calibrationCollection = new Database('calibrations')
