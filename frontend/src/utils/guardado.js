import { ref } from 'vue'

/*
 * Estado reutilizable para la tarjeta gelatinosa de "guardado".
 * Cada vista crea su propia instancia:
 *
 *   const { mostrar, texto, animar } = usarGuardado()
 *   ...
 *   await animar('Rol actualizado')   // muestra la tarjeta ~1.15s
 *
 * y en el template:
 *
 *   <TarjetaGuardado :visible="mostrar" :texto="texto" />
 */
export function usarGuardado() {
  const mostrar = ref(false)
  const texto = ref('Cambios guardados')

  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function animar(mensaje, duracion = 1150) {
    texto.value = mensaje || 'Cambios guardados'
    mostrar.value = true
    await esperar(duracion)
  }

  function ocultar() {
    mostrar.value = false
  }

  return { mostrar, texto, animar, ocultar }
}
