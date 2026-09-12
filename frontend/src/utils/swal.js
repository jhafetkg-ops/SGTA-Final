import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Tema morado institucional para TODOS los diálogos del sistema
// (alert, confirm, prompt), igual a la tarjeta de "guardado".
const estiloSigtaSwal = document.createElement('style')
estiloSigtaSwal.textContent = `
  .sigta-swal-popup {
    border-radius: 26px !important;
    padding: 30px 22px !important;
    background: linear-gradient(140deg, #5b1780 0%, #9b1fb8 55%, #b52bd0 100%) !important;
    box-shadow: 0 26px 60px rgba(70, 8, 100, .5) !important;
  }
  .sigta-swal-title {
    color: #fff !important;
    font-size: 19px !important;
    font-weight: 800 !important;
  }
  .sigta-swal-text {
    color: #fff !important;
    font-size: 15px !important;
    font-weight: 600 !important;
  }
  .sigta-swal-actions {
    gap: 10px !important;
  }
  .sigta-swal-confirm {
    padding: 10px 30px !important;
    border-radius: 999px !important;
    background: #fff !important;
    color: #7a1ba8 !important;
    font-size: 14px !important;
    font-weight: 800 !important;
    border: none !important;
    box-shadow: none !important;
  }
  .sigta-swal-confirm:hover {
    background: #f3e8fa !important;
  }
  .sigta-swal-cancel {
    padding: 10px 26px !important;
    border-radius: 999px !important;
    background: rgba(255, 255, 255, .16) !important;
    color: #fff !important;
    font-size: 14px !important;
    font-weight: 800 !important;
    border: 1px solid rgba(255, 255, 255, .4) !important;
    box-shadow: none !important;
  }
  .sigta-swal-cancel:hover {
    background: rgba(255, 255, 255, .3) !important;
  }
  .sigta-swal-input {
    border-radius: 10px !important;
    border: none !important;
    box-shadow: none !important;
  }
`
document.head.appendChild(estiloSigtaSwal)

export const SigtaModal = Swal.mixin({
  iconColor: '#fff',
  allowOutsideClick: false,
  buttonsStyling: false,
  customClass: {
    popup: 'sigta-swal-popup',
    title: 'sigta-swal-title',
    htmlContainer: 'sigta-swal-text',
    actions: 'sigta-swal-actions',
    confirmButton: 'sigta-swal-confirm',
    cancelButton: 'sigta-swal-cancel',
    input: 'sigta-swal-input',
  },
})

// Override nativo de alert para todo el sistema
window.alert = function(msg) {
  SigtaModal.fire({
    text: msg,
    icon: 'info',
    confirmButtonText: 'Aceptar'
  })
}

// Helpers asíncronos para reemplazar confirm y prompt
window.sigtaConfirm = async function(msg) {
  const res = await SigtaModal.fire({
    title: 'Confirmación',
    text: msg,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar'
  })
  return res.isConfirmed
}

window.sigtaPrompt = async function(msg, defaultText = '') {
  const res = await SigtaModal.fire({
    title: msg,
    input: 'text',
    inputValue: defaultText,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  })
  return res.value // Será undefined si se cancela, o el string si se acepta
}
