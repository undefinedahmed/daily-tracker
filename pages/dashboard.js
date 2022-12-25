import { useEffect, useState } from "react";
import ProtectedRoute from "../config/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Dashboard.module.css";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import Modal from "../components/modal";

const DashboardPage = () => {
  const db = getFirestore();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };
    if (user.uid) fetchData();
  }, [user]);

  const getUserData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    setUserData(docSnap.data());
  };

  const addNewGoal = async (data) => {
    if (user && user.uid) {
      const docRef = doc(db, "users", user.uid);

      const dataToSave = {
        ...data,
      };
      // Atomically add a new region to the "regions" array field.
      await updateDoc(docRef, {
        goals: arrayUnion(dataToSave),
      })
        .then(() => {
          console.log("Updated Successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("dataToSave: ", dataToSave);
      const goalsDocRef = collection(db, "goals");
      addDoc(goalsDocRef, {
        ...dataToSave,
        userId: user.uid,
      })
        .then(() => {
          console.log("New Goal Saved Successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      setShowModal(!showModal);
    }
  };

  // TODO: remove goal
  // TODO: edit goal
  // TODO: goal completed check
  // TODO: goal progress
  // TODO: fix private route issue
  // TODO: add loader while fetching the goal

  let addNewGoalModalProps = {
    title: "Add New Goal",
    buttonText: "Add",
    cancel: "Cancel",
    onClose: () => setShowModal(!showModal),
    onSubmit: (data) => addNewGoal(data),
    addGoal: true,
  };

  return (
    <ProtectedRoute>
      <div className={styles.main}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>Welcome</h2>
          {userData && userData.goals && userData.goals.length > 0 ? (
            <>
              <h3 className={styles.subHeading}>Your Goals</h3>
              {userData.goals.map((each) => {
                return <p>{each.title}</p>;
              })}
            </>
          ) : (
            <h3 className={styles.subHeading}>
              Get Started, Add Your First Goal
            </h3>
          )}
          <div className={styles.buttonContainer}>
            <button
              onClick={() => {
                setShowModal(!showModal);
              }}
              className={styles.button}
            >
              <p className={styles.buttonInner}>Add A New Goal</p>
            </button>
          </div>
          {showModal && <Modal {...addNewGoalModalProps} />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
