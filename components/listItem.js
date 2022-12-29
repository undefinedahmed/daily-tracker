import React from "react";
import styles from "../styles/ListItem.module.css";

const ListItem = ({ item, deleteHandler }) => {
  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <p>{item.title}</p>
        <span className={styles.actionsContainer}>
          <p onClick={() => editHandler(item.goalId, item)}>Edit</p>
          <p onClick={() => deleteHandler(item.goalId, item)}>Delete</p>
        </span>
      </div>
    </div>
  );
};

export default ListItem;
