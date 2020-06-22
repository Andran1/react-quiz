import React from "react";
import classes from "./AnswersList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={() => props.onAnswerClick(answer.id)}
            state={props.state ? props.state[answer.id] : null} //  {1: "error"} {3: "success"}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
