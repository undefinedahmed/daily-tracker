import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import style from "../styles/Modal.module.css";

const Modal = (props) => {
  const methods = useForm({ mode: "onBlur" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    props.onSubmit(data);
  };

  return (
    <>
      <div onClick={() => props.onClose()} className={style.backdrop} />
      <div className={`${style.card} ${style.modal}`}>
        <header className={style.header}>
          <h2>{props.title}</h2>
        </header>
        {props.addGoal && (
          <FormProvider {...methods}>
            <form
              action=""
              className={style.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style.marginTop}>
                <div className={style.labelMain}>
                  <label htmlFor="" className={style.labelInner}>
                    Goal Title
                  </label>
                </div>

                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className={style.input}
                />
                {errors.title && (
                  <p className={style.textRed}>{errors.title.message}</p>
                )}
              </div>

              <div className={style.marginTop}>
                <div className={style.labelMain}>
                  <label htmlFor="" className={style.labelInner}>
                    Start Date
                  </label>
                </div>

                <input
                  type="date"
                  {...register("startDate", {
                    required: "Start Date is required",
                  })}
                  className={style.input}
                />
                {errors.startDate && (
                  <p className={style.textRed}>{errors.startDate.message}</p>
                )}
              </div>

              <div className={style.marginTop}>
                <div className={style.labelMain}>
                  <label htmlFor="" className={style.labelInner}>
                    End Date
                  </label>
                </div>

                <input
                  type="date"
                  {...register("endDate", {
                    required: "End Date is required",
                  })}
                  className={style.input}
                />
                {errors.endDate && (
                  <p className={style.textRed}>{errors.endDate.message}</p>
                )}
              </div>
              <footer className={style.actions}>
                <div className={style.buttonContainer}>
                  <button type="submit" className={style.button}>
                    <p className={style.buttonInner}>{props.buttonText}</p>
                  </button>
                  <button
                    onClick={() => props.onClose()}
                    className={style.button}
                  >
                    <p className={style.buttonInner}>{props.cancel}</p>
                  </button>
                </div>
              </footer>
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
};

export default Modal;
