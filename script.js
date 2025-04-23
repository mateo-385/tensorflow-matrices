const filas = document.getElementById('filas')
const columnas = document.getElementById('columnas')
const btn = document.getElementById('btn')
const resultado = document.getElementById('resultado')

btn.addEventListener('click', async () => {
  const matrizA = tf.randomUniform(
    [parseInt(filas.value), parseInt(columnas.value)],
    1,
    21,
    'int32'
  )
  const matrizB = tf.randomUniform(
    [parseInt(filas.value), parseInt(columnas.value)],
    1,
    21,
    'int32'
  )

  const suma = tf.add(matrizA, matrizB)
  const multiplicacion = tf.matMul(matrizA, matrizB.transpose())

  const arrayA = await matrizA.array()
  const arrayB = await matrizB.array()
  const arraySuma = await suma.array()
  const arrayMultiplicacion = await multiplicacion.array()

  resultado.innerHTML = `
    <h3>Matriz A</h3>
    ${crearTablaHTML(arrayA)}
    <h3>Matriz B</h3>
    ${crearTablaHTML(arrayB)}
    <h3>Suma (A + B)</h3>
    ${crearTablaHTML(arraySuma)}
    <h3>Multiplicación (A * B^T)</h3>
    ${crearTablaHTML(arrayMultiplicacion)}
  `

  matrizA.dispose()
  matrizB.dispose()
  suma.dispose()
  multiplicacion.dispose()
})

function crearTablaHTML(array) {
  return `
      <div class="  rounded-box    ">
        <table class="table">
          <tbody>
            ${array
              .map(
                (fila, index) =>
                  `<tr>
                    <th>${index + 1}</th>
                    ${fila.map((valor) => `<td>${valor}</td>`).join('')}
                  </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `
}
