import styles from "./MyButton.module.css";
import classNames from "classnames";

interface IMyButtonProps {
  text?: string;
  isDanger?: boolean;
  myType?: "button" | "submit" | "reset";
  func?: () => void;
}

const handleDefaultClick = () => {
  console.log("default click!");
};

function MyButton({
  func = handleDefaultClick,
  isDanger = true,
  text = "Click",
  myType = "button",
}: IMyButtonProps) {
  return (
    <button
      type={myType}
      onClick={func}
      className={classNames(styles.myButton, {
        [styles.btnDanger]: isDanger,
        [styles.btnPrimary]: !isDanger,
      })}
    >
      {text}
    </button>
  );
}

export default MyButton;