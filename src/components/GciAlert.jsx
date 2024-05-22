

import Swal from "sweetalert2";


export function SuccessMessage ({title, text}) {
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        cancelButtonColor: "#017d88",
        confirmButtonColor: "#017d88",
        showConfirmButton: false,
        timer: 1000
      });
};

export function ErrorMessage (e) {
    Swal.fire({
        title: "Error",
        text: `Error ${e}`,
        icon: "error",
        cancelButtonColor: "#017d88",
        confirmButtonColor: "#017d88",
        showConfirmButton: true,
      });
}