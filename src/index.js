const azul = document.getElementById('azul')
const amarillo = document.getElementById('amarillo')
const rojo = document.getElementById('rojo')
const verde = document.getElementById('verde')

const botonEmpezar = document.getElementById('botonEmpezar')
const ultimo = 10
const puntuacion = 0

class JuegoSimon {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.bitbotonEmpezar()
    this.nivel = 1
    this.puntuacion = 0
    this.colores = {azul,amarillo,rojo,verde}
  }

  bitbotonEmpezar() {
    if (botonEmpezar.classList.contains('hide')) {
      botonEmpezar.classList.remove('hide')
    }else {
      botonEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ultimo).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    this.auxnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  iluminarColor(i) {
    this.colores[i].classList.add('light')
    setTimeout(() => this.apagarColor(i), 350)
  }

  apagarColor(i) {
    this.colores[i].classList.remove('light')
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
    const color = this.convertirNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i) 
    }
  }

  agregarEventosClick() {
    this.colores.azul.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.amarillo.addEventListener('click', this.elegirColor)
    this.colores.rojo.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.azul.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.amarillo.removeEventListener('click', this.elegirColor)
    this.colores.rojo.removeEventListener('click', this.elegirColor)
  }

  elegirColor(a) {
    const nombreColor = a.target.dataset.color
    const numeroColor = this.convertirColorANumero(nombreColor)
    this.iluminarColor(nombreColor)

    if (numeroColor ===  this.secuencia[this.auxnivel]) {
      this.auxnivel++
      this.puntuacion++
      if (this.auxnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ultimo + 1)) {
          this.gana()
        } else {
          swal("Bien!!!", `Puntuación: ${this.puntuacion} puntos \n next level: ${this.nivel}`)
          .then(() => setTimeout(this.siguienteNivel, 1000))
        }
      }
    } else {
      this.pierde()
    }
  }

  gana() {
    swal("Simon dice GANASTE", `\n Puntuación Final: ${this.puntuacion}`)
      .then(this.inicializar)
  }

  pierde() {
    swal("Simon dice PERDISTE :v",`\n Puntuación Final: ${this.puntuacion}`)
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }

  convertirNumeroAColor(numero) {
    switch (numero) {
      case 0: return 'azul'
      case 1: return 'amarillo'
      case 2: return 'rojo'
      case 3: return 'verde'
    }
  }

  convertirColorANumero(color) {
    switch (color) {
      case 'azul':     return 0
      case 'amarillo': return 1
      case 'rojo':     return 2
      case 'verde':    return 3
    }
  }
}
  function empezarJuego() {
    window.juego = new JuegoSimon()
  }
