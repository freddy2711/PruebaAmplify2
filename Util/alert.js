/** @format */

import alertify from "alertifyjs";
export const getAlert = (detail, redirect, alertMessage) => {
  alertify
    .alert(detail, function () {
      if (redirect !== "") {
        window.location.href = redirect;
      } else if (redirect === "./Home") {
        window.location.href = redirect;
        localStorage.removeItem("userLogin");
        localStorage.removeItem("studientActive");
        localStorage.removeItem("studientList");
      }
    })
    .setHeader(
      alertMessage === "" || alertMessage === undefined
        ? "Notificación de Sección"
        : alertMessage
    );
};

export const getAlertConfir = (detail, redirect, alertMessage) => {
  return alertify.confirm(
    alertMessage,
    detail,
    function () {
      alertify.success("Ok");
      return true;
    },
    function () {
      alertify.error("Cancel");
      return false;
    }
  );
};
