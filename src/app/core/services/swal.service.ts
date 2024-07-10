import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  showSuccess() {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Saved successfuly!",
      showConfirmButton: false,
      timer: 1500
    });
  }

  showInfo(message: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showSuccessMessage(message: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  showWarning(message: string, title: string, buttonText: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: buttonText
    });
  }

  showFullSuccess(message: string) {
    Swal.fire({
      title: "SUCCESS",
      text: message,
      icon: "success",
      confirmButtonText: "Close"
    });
  }

}
