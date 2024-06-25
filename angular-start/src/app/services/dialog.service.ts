import { Injectable } from '@angular/core';

// @ts-ignore
import Swal, {SweetAlertIcon} from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() {
  }

  simpleMessage(message: string, type?: SweetAlertIcon) {
    Swal.fire({
      position: 'top-end',
      icon: type ? type : 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showSuccess(message: string, title?: string) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      Swal.fire({
        title: title ? title : message,
        text: title ? message : null,
        icon: 'success',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonText:
          '<i class="fas fa-check-circle"></i> '.concat('Aceptar'),
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }

  showWarning(message: string, title?: string, cancelButton?: boolean, confirmTitle?: string, cancelTitle?: string) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      Swal.fire({
        title: title ? title : message,
        text: title ? message : null,
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: cancelButton ? cancelButton : false,
        confirmButtonText:
          '<i></i> '.concat(confirmTitle ? confirmTitle : 'Delete'),
        cancelButtonText:
          '<i></i> '.concat(cancelTitle ? cancelTitle : 'Cancel'),
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result: any) => {
        if (result.isConfirmed) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }

  showError(message: string, title?: string, cancelButton?: boolean, confirmTitle?: string, cancelTitle?: string) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      Swal.fire({
        title: title ? title : message,
        text: title ? message : null,
        icon: 'error',
        allowOutsideClick: false,
        showCancelButton: cancelButton ? cancelButton : false,
        confirmButtonText:
          '<i class="fas fa-check-circle"></i> '.concat(confirmTitle ? confirmTitle : 'Continuar'),
        cancelButtonText:
          '<i class="fas fa-times-circle"></i> '.concat(cancelTitle ? cancelTitle : 'Cancelar'),
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result: any) => {
        if (result.value) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
}
