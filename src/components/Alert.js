import React from "react";

const Alert = (props) => {
 // CAPITALIZE FUNCTION FOR ALEAR TYPE 'SUCCESS'
 const capitalize = (string) => {
  let lower = string.toLowerCase();
  let capt = lower.charAt(0).toUpperCase() + lower.slice(1);
  // console.log(capt);
  return capt;
};
return (
  <div style={{paddingTop: '3.5rem'}} >
    {props.myAlert && (
      <div
        className={`alert alert-${props.myAlert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong> {capitalize(props.myAlert.type==="danger"?"error": props.myAlert.type)}</strong> {props.myAlert.msg}
      </div>
    )}
  </div>
);
};
export default Alert;
