import { db } from "../firebase/config";
import {
   collection,
   doc,
   setDoc,
   getDoc,
   updateDoc,
   arrayUnion,
   increment,
   Timestamp,
} from "firebase/firestore";

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
    * Stores the initial config data for the current user (calibration and empty metrics array)
    * @example
    * const user_db = new Database('users')
    * user_db.storeInitialData('userUID', -30, 41)
    *    .then(()=> { console.log("successfully stored calibration data") })
    *    .catch((error) => { console.log(`Error occurred: ${error}`) })
    * @param {String} userUID The current user's unique UID from firebase auth
    * @param {number} ext The calibration extension value
    * @param {number} flex The calibration extension value
    * @returns {Promise}
    */
   async storeInitialData(userUID, ext, flex) {
      return new Promise(async (resolve, reject) => {
         const docRef = doc(db, this.collectionPath, userUID);
         setDoc(docRef, { extension: ext, flexion: flex, metrics: [] })
            .then(() => {
               resolve("Successfully initialized user!");
            })
            .catch((e) => {
               reject(e);
            });
      });
   }

   /**
    * Updates an existing user's calibration data if they are in the database
    * @example
    * const user_db = new Database('users')
    * user_db.updateCalibration('userUID', -30, 41)
    *    .then(()=> { console.log("successfully updated calibration data") })
    *    .catch((error) => { console.log(`Error occurred: ${error}`) })
    * @param {String} userUID The current user's unique UID from firebase auth
    * @param {number} ext The calibration extension value
    * @param {number} flex The calibration extension value
    * @returns {Promise}
    */
   async updateCalibration(userUID, ext, flex) {
      return new Promise((resolve, reject) => {
         const docRef = doc(db, this.collectionPath, userUID);
         updateDoc(docRef, { extension: ext, flexion: flex })
            .then(() => {
               resolve("Successfully updated user calibrations!");
            })
            .catch((e) => {
               reject(e);
            });
      });
   }

   /**
    * Gets relevant data for the current user if the entry exists
    * @example
    * const user_db = new Database('users')
    * user_db.getdata('userUID')
    *    .then((data) => console.log("Data received:", data))
    *    .catch((error) => console.log("Error occurred retrieving user data:", error))
    * @param {String} userUID The current user's unique UID from firebase auth
    * @returns {Promise}
    */
   async getData(userUID) {
      return new Promise(async (resolve, reject) => {
         const docRef = doc(db, this.collectionPath, userUID);
         getDoc(docRef)
            .then((data) => {
               if (data.exists()) {
                  resolve(data.data());
               } else {
                  reject("Data does not exist");
               }
            })
            .catch((e) => {
               reject(e);
            });
      });
   }

   /**
    * Appends metric to the user's designated entry. Only pass in userUID if user 
    * did not use device during session (i.e. they didn't pump the device at all)
    * @example
    * const user_db = new Database('users')
    * user_db.addMetric('userUID', 3, 80)
    *    .then((r) => console.log(r))
    *    .catch((e) => console.log("Error occurred saving metric:", e))
    * @param {String} userUID The current user's unique UID from firebase auth
    * @param {number} numPumps The total number of pumps used in the session
    * @param {number} postureScore The overall posture score for the session
    * @returns {Promise}
    */
   async addMetric(userUID, numPumps=0, postureScore=null) {
      return new Promise((resolve, reject) => {
         const docRef = doc(db, this.collectionPath, userUID);
         updateDoc(docRef, {
            metrics: arrayUnion({
               num_pumps: numPumps,
               posture_score: postureScore,
               date: Timestamp.now()
            }),
         })
            .then(() => {
               resolve("Metric saved");
            })
            .catch((e) => {
               reject(e);
            });
      });
   }
}

export const userCollection = new Database("users");
