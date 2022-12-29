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
  deleteDoc,
} from "firebase/firestore";
import Modal from "../components/modal";
import Loader from "../components/loader";
import ListItem from "../components/listItem";

const DashboardPage = () => {
  const db = getFirestore();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };
    if (user.uid) fetchData();
  }, [user]);

  const getUserData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
    setLoading(false);
  };

  const addNewGoal = async (data) => {
    if (user && user.uid) {
      const docRef = doc(db, "users", user.uid);
      const goalId =
        Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1) +
        Date.now() +
        Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);

      const dataToSave = {
        ...data,
        completed: false,
        goalId,
      };
      // add a new goal in the user document
      await updateDoc(docRef, {
        goals: arrayUnion(dataToSave),
      })
        .then(() => {
          console.log("Updated Successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      const goalsDocRef = doc(db, "goals", goalId);
      // add a new goal inside goals collection
      setDoc(goalsDocRef, {
        ...dataToSave,
        userId: user.uid,
      })
        .then(() => {
          console.log("New Goal Saved Successfully");
          getUserData();
        })
        .catch((e) => {
          console.log(e);
        });
      setShowModal(!showModal);
    }
  };

  const deleteHandler = (id, objectToDelete) => {
    const userDoc = doc(db, "users", user.uid);
    const goalsDoc = doc(db, "goals", id);
    updateDoc(userDoc, {
      goals: arrayRemove(objectToDelete),
    })
      .then(() => {
        getUserData();
        console.log("Object Deleted Successfully");
      })
      .catch((e) => {
        console.log("Error while deleting from array:", e);
      });
    deleteDoc(goalsDoc)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log("Error while deleting doc:", error);
      });
  };

  const editHandler = (id, objectToEdit) => {
    console.log("id, objectToEdit: ", id, objectToEdit);
  };

  // TODO: edit goal
  // TODO: goal completed check
  // TODO: goal progress

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
          {loading ? (
            <Loader />
          ) : userData && userData.goals && userData.goals.length > 0 ? (
            <>
              <h3 className={styles.subHeading}>Your Goals</h3>
              {userData.goals.map((each) => {
                return (
                  <ListItem
                    item={each}
                    deleteHandler={deleteHandler}
                    editHandler={editHandler}
                  />
                );
              })}
            </>
          ) : (
            <h3 className={styles.subHeading}>
              Get Started, Add Your First Goal!
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
