import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/SignUp.module.css";
import { useRouter } from "next/router";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const SignupPage = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const methods = useForm({ mode: "onBlur" });
  const token = localStorage.getItem("rekcartyliad");

  useEffect(() => {
    if (token) router.push("/dashboard");
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await signUp(data.email, data.password);
      const db = getFirestore();
      const docRef = doc(db, "users", response.user.uid);
      const dataToSave = {
        name: data.name,
        id: response.user.uid,
        email: data.email,
        goals: [],
      };
      setDoc(docRef, dataToSave)
        .then(() => {
          console.log("Document has been added successfully");
        })
        .catch((error) => {
          console.log(error);
        });
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Sign Up</h2>
      <FormProvider {...methods}>
        <form
          action=""
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.marginTop}>
            <div className={styles.labelMain}>
              <label htmlFor="" className={styles.labelInner}>
                Full Name
              </label>
            </div>

            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={styles.input}
            />
            {errors.name && (
              <p className={styles.textRed}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.marginTop}>
            <div className={styles.labelMain}>
              <label htmlFor="" className={styles.labelInner}>
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.textRed}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.marginTop}>
            <div className={styles.labelMain}>
              <label htmlFor="" className={styles.labelInner}>
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.textRed}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.marginTop}>
            <div className={styles.labelMain}>
              <label htmlFor="" className={styles.labelInner}>
                Confirm Password
              </label>
            </div>

            <input
              type="password"
              {...register("password_confirm", {
                required: "Verify your password",
              })}
              className={styles.input}
            />
            {errors.password_confirm && (
              <p className={styles.textRed}>
                {errors.password_confirm.message}
              </p>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              <p className={styles.buttonInner}>submit</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupPage;
