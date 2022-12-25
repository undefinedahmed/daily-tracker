import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

const LoginPage = () => {
  const methods = useForm({ mode: "onBlur" });
  const { logIn } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      let res = await logIn(data.email, data.password);
      localStorage.setItem("rekcartyliad", res.user.uid);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Log In</h2>
      <FormProvider {...methods}>
        <form
          action=""
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
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

export default LoginPage;
