import { React, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as json from "./../../jsons/punto1.json";
import Grafica from "../grafica.jsx";
import { Bar, Line } from "react-chartjs-2";

const validationSchema = Yup.object().shape({
  numero_iteracciones: Yup.number()
    .min(1, "Ingrese una cantidad válida.  ")
    .required("Número de iteracciones es requerido."),
  error_max: Yup.number()
    .min(0.00001, "Ingrese un valor entre 0 y 1.")
    .max(1, "Ingrese un valor entre 0 y 1.")
    .required("Error maximo permitido requerido."),
  rata_aprendizaje: Yup.number()
    .min(0.00001, "ingrese un valor mayor a 0.")
    .required("Rata de aprendizaje requerida."),
  banco_datos: Yup.string()
    .min(4, "Seleccione un arvhivo válido.")
    .required("El banco de datos es requerido.."),
  algoritmo_entrenamiento: Yup.string()
    .min(2, "Selecciones un algoritmo de entrenamiento.")
    .required("Selecciones un algoritmo de entrenamiento."),
  funcion_activacion: Yup.string()
    .min(2, "Selecciones una función de activación.")
    .required("Selecciones una función de activación."),
  numero_neuronas_capa_1: Yup.number().min(
    1,
    "Ingrese una cantidad mayor a 0."
  ),
  funcion_activacion_capa_1: Yup.string().min(
    2,
    "Selecciones una función de activación."
  ),
  numero_neuronas_capa_2: Yup.number().min(
    1,
    "Ingrese una cantidad mayor a 0."
  ),
  funcion_activacion_capa_2: Yup.string().min(
    2,
    "Selecciones una función de activación."
  ),
  numero_neuronas_capa_3: Yup.number().min(
    1,
    "Ingrese una cantidad mayor a 0."
  ),
  funcion_activacion_capa_3: Yup.string().min(
    2,
    "Selecciones una función de activación."
  ),
  numero_neuronas_capa_4: Yup.number().min(
    1,
    "Ingrese una cantidad mayor a 0."
  ),
  funcion_activacion_capa_4: Yup.string().min(
    2,
    "Selecciones una función de activación."
  ),
  numero_neuronas_capa_5: Yup.number().min(
    1,
    "Ingrese una cantidad mayor a 0."
  ),
  funcion_activacion_capa_5: Yup.string().min(
    2,
    "Selecciones una función de activación."
  ),
  numero_capas_ocultas: Yup.number()
    .min(1, "Ingrese una cantidad mayor a 0.")
    .max(5, "Se permiten maximo 5 capas ocultas.")
    .required("El númerod  ecapas ocultas es requerido."),
});
let entradas = 0;
let salidas = 0;
let patrones = 0;
let ws = [];
let us = [];
let wsOld = [];
let usOld = [];
let wActual = [];
let uActual = [];
let yValue = new Array();
let xValue = new Array();
let iteracciones = 0;
let endErms = 0;
let redEntrenada = "NO";

function PerceptronEntrenamiento() {
  function setWActual(w) {
    wActual = w;
  }
  function setUActual(u) {
    uActual = u;
  }
  const [capas, setCapas] = useState(1);

  const [data, setData] = useState([]);
  const [bancoDatos, setBancoDatos] = useState([]);
  const [nEntradad, setNEntradas] = useState(0);
  const [nSalidas, setNSalidas] = useState(0);
  const [nPatrones, setNPatrones] = useState(0);
  const [xIteraccion, setXIteraccion] = useState(["1"]);
  const [yErms, setYErms] = useState([0]);
  const [wOld, setWOld] = useState([]);
  const [uOld, setUOld] = useState([]);

  function cargarBancoDatos(dataRed) {
    setNEntradas(json.entrada[0].length);
    setNSalidas(json.salida[0].length);
    setNPatrones(json.entrada.length);
    entradas = json.entrada[0].length;
    salidas = json.salida[0].length;
    patrones = json.entrada.length;
  }

  const entrenamiento = (dataRed) => {
    let iteraccion = 0;
    let erms = 2;
    let sFuncionSoma = [];
    let eLineal = [];
    let ePatron = [];
    while (
      iteraccion <= dataRed.numero_iteracciones &&
      erms > dataRed.error_max
    ) {
      iteraccion = iteraccion + 1;
      erms = 0;
      console.log("ITERACCION: ", iteraccion);
      for (let p = 0; p < nPatrones; p++) {
        //Calcular salida d ela funcion soma
        for (let capa = 0; capa <= dataRed.numero_capas_ocultas; capa++) {
          //console.log("Capa actual: ",capa)
          //console.log("Salida funcionActivacion",sFuncionSoma);
          //console.log(`capa${capa}`);
          switch (capa) {
            case 0:
              if (capa == dataRed.numero_capas_ocultas) {
                sFuncionSoma[`capaSalida`] = suma(
                  json.entrada[p],
                  nSalidas,
                  wActual.capa0.pesos,
                  uActual.capa0.umbrales
                );
              } else {
                sFuncionSoma[`capa${capa}`] = suma(
                  json.entrada[p],
                  dataRed.numero_neuronas_capa_1,
                  wActual.capa0.pesos,
                  uActual.capa0.umbrales
                );
              }
              break;
            case 1:
              if (capa == dataRed.numero_capas_ocultas) {
                sFuncionSoma[`capaSalida`] = suma(
                  sFuncionSoma.capa0,
                  nSalidas,
                  wActual.capa1.pesos,
                  uActual.capa1.umbrales
                );
              } else {
                sFuncionSoma[`capa${capa}`] = suma(
                  sFuncionSoma.capa0,
                  dataRed.numero_neuronas_capa_2,
                  wActual.capa1.pesos,
                  uActual.capa1.umbrales
                );
              }
              break;
            case 2:
              if (capa == dataRed.numero_capas_ocultas) {
                sFuncionSoma[`capaSalida`] = suma(
                  sFuncionSoma.capa1,
                  nSalidas,
                  wActual.capa1.pesos,
                  uActual.capa2.umbrales
                );
              } else {
                sFuncionSoma[`capa${capa}`] = suma(
                  sFuncionSoma.capa1,
                  dataRed.numero_neuronas_capa_3,
                  wActual.capa2.pesos,
                  uActual.capa2.umbrales
                );
              }
              break;
            case 3:
              if (capa == dataRed.numero_capas_ocultas) {
                sFuncionSoma[`capaSalida`] = suma(
                  sFuncionSoma.capa2,
                  nSalidas,
                  wActual.capa3.pesos,
                  uActual.capa3.umbrales
                );
              } else {
                sFuncionSoma[`capa${capa}`] = suma(
                  sFuncionSoma.capa2,
                  dataRed.numero_neuronas_capa_4,
                  wActual.capa3.pesos,
                  uActual.capa3.umbrales
                );
              }
              break;
            case 4:
              if (capa == dataRed.numero_capas_ocultas) {
                sFuncionSoma[`capaSalida`] = suma(
                  sFuncionSoma.capa3,
                  nSalidas,
                  wActual.capa4.pesos,
                  uActual.capa4.umbrales
                );
              } else {
                sFuncionSoma[`capa${capa}`] = suma(
                  sFuncionSoma.capa3,
                  dataRed.numero_neuronas_capa_5,
                  wActual.capa4.pesos,
                  uActual.capa4.umbrales
                );
              }
              break;
            case 5:
              sFuncionSoma[`capaSalida`] = suma(
                sFuncionSoma.capa4,
                nSalidas,
                wActual.capa5.pesos,
                uActual.capa5.umbrales
              );
              break;
            default:
              console.log("Mal");
              break;
          }
        }
        //console.log("SALIDA SUMA::",sFuncionSoma);
        //Calcular error lineal
        for (let i = 0; i < nSalidas; i++) {
          //console.log("SALIDA: ",json.salida[p][i]);
          eLineal[i] =
            json.salida[p][i] - Math.abs(sFuncionSoma.capaSalida.s[i]);
        }
        //Calcular error del patron
        ePatron[p] = 0;
        for (let i = 0; i < nSalidas; i++) {
          ePatron[p] = ePatron[p] + Math.abs(eLineal[i]);
        }
        ePatron[p] = ePatron[p] / nSalidas;
        erms = erms + ePatron[p];

        if (ePatron[p] >= dataRed.error_max) {
          modificarPersosUmbrales(
            dataRed,
            eLineal,
            ePatron[p],
            json.entrada[p]
          );
        }
      }
      console.log(erms, "/", nPatrones);
      erms = erms / nPatrones;
      console.log("Erms:", erms);
    }
  };

  const modificarPesos = (w, x, y, e, r, s) => {
    let newPeso = 0;
    let pesos = [];
    for (let i = 0; i < y; i++) {
      pesos[i] = new Array();
      for (let j = 0; j < x.length; j++) {
        if (s) {
          newPeso = w[i][j] + r * e[i] * x[j];
        } else {
          newPeso = w[i][j] + r * e * x[j];
        }
        pesos[i][j] = newPeso;
      }
    }
    return pesos;
  };

  const modificarUmbrales = (u, y, e, r, s) => {
    let umbrales = [];
    for (let i = 0; i < y; i++) {
      if (s) {
        umbrales[i] = u[i] + r * e[i];
      } else {
        umbrales[i] = u[i] + r * e;
      }
    }
    return umbrales;
  };

  const modificarPersosUmbrales = (dataRed, eLineal, ePatron, patron) => {
    let newWs = [];
    let newUs = [];
    for (let i = 0; i <= dataRed.numero_capas_ocultas; i++) {
      let pesos = new Array();
      let umbrales = new Array();
      switch (i) {
        case 0:
          if (i == dataRed.numero_capas_ocultas) {
            pesos = modificarPesos(
              wActual.capa0.pesos,
              patron,
              nSalidas,
              eLineal,
              dataRed.rata_aprendizaje,
              true
            );
            umbrales = modificarUmbrales(
              uActual.capa0.umbrales,
              nSalidas,
              eLineal,
              dataRed.rata_aprendizaje,
              true
            );
          } else {
            pesos = modificarPesos(
              wActual.capa0.pesos,
              patron,
              dataRed.numero_neuronas_capa_1,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
            umbrales = modificarUmbrales(
              uActual.capa0.umbrales,
              dataRed.numero_neuronas_capa_1,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
          }
          break;
        case 1:
          if (i == dataRed.numero_capas_ocultas) {
            pesos = modificarPesos(
              wActual.capa1.pesos,
              patron,
              nSalidas,
              eLineal,
              dataRed.rata_aprendizaje,
              true
            );
            umbrales = modificarUmbrales(
              uActual.capa1.umbrales,
              nSalidas,
              ePatron,
              dataRed.rata_aprendizaje,
              true
            );
          } else {
            pesos = modificarPesos(
              wActual.capa1.pesos,
              patron,
              dataRed.numero_neuronas_capa_2,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
            umbrales = modificarUmbrales(
              uActual.capa1.umbrales,
              dataRed.numero_neuronas_capa_2,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
          }
          break;
        case 2:
          if (i == dataRed.numero_capas_ocultas) {
            pesos = modificarPesos(
              wActual.capa2.pesos,
              patron,
              nSalidas,
              eLineal,
              dataRed.rata_aprendizaje,
              true
            );
            umbrales = modificarUmbrales(
              uActual.capa2.umbrales,
              nSalidas,
              ePatron,
              dataRed.rata_aprendizaje,
              true
            );
          } else {
            console.log(wActual.capa2.pesos);
            pesos = modificarPesos(
              wActual.capa2.pesos,
              patron,
              dataRed.numero_neuronas_capa_3,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
            umbrales = modificarUmbrales(
              uActual.capa2.umbrales,
              dataRed.numero_neuronas_capa_3,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
          }
          break;
        case 3:
          if (i == dataRed.numero_capas_ocultas) {
            pesos = modificarPesos(
              wActual.capa3.pesos,
              patron,
              nSalidas,
              eLineal,
              dataRed.rata_aprendizaje,
              true
            );
            umbrales = modificarUmbrales(
              uActual.capa3.umbrales,
              nSalidas,
              ePatron,
              dataRed.rata_aprendizaje,
              true
            );
          } else {
            pesos = modificarPesos(
              wActual.capa3.pesos,
              patron,
              dataRed.numero_neuronas_capa_4,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
            umbrales = modificarUmbrales(
              uActual.capa3.umbrales,
              dataRed.numero_neuronas_capa_4,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
          }
          break;
        case 4:
          if (i == dataRed.numero_capas_ocultas) {
            pesos = modificarPesos(
              wActual.capa4.pesos,
              patron,
              nSalidas,
              eLineal,
              dataRed.rata_aprendizaje,
              true
            );
            umbrales = modificarUmbrales(
              uActual.capa4.umbrales,
              nSalidas,
              ePatron,
              dataRed.rata_aprendizaje,
              true
            );
          } else {
            pesos = modificarPesos(
              wActual.capa4.pesos,
              patron,
              dataRed.numero_neuronas_capa_5,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
            umbrales = modificarUmbrales(
              uActual.capa4.umbrales,
              dataRed.numero_neuronas_capa_5,
              ePatron,
              dataRed.rata_aprendizaje,
              false
            );
          }
          break;
        case 5:
          pesos = modificarPesos(
            wActual.capa5.pesos,
            patron,
            nSalidas,
            eLineal,
            dataRed.rata_aprendizaje,
            true
          );
          umbrales = modificarUmbrales(
            uActual.capa5.umbrales,
            nSalidas,
            ePatron,
            dataRed.rata_aprendizaje,
            true
          );
          break;
        default:
          break;
      }
      newWs[`capa${i}`] = { pesos };
      newUs[`capa${i}`] = { umbrales };
    }
    //setWOld(wActual);
    setWActual(newWs);
    setWActual(newUs);
    //console.log("UMBLARES: ",uActual);
  };

  const suma = (x, y, w, u) => {
    let s = [];
    for (let i = 0; i < y; i++) {
      s[i] = 0;
      for (let j = 0; j < x.length; j++) {
        s[i] = s[i] + (x[j] * w[i][j] - u[i]);
      }
      s[i] = Math.tanh(s[i]);
    }
    return { s };
  };

  function numeroAleatorioDecimales(max, min) {
    var num = Math.random() * (max - min);
    return num + min;
  }

  function cargarPesosUmbrales(dataRed) {
    for (let i = 0; i <= dataRed.numero_capas_ocultas; i++) {
      var pesos = new Array();
      var umbrales = new Array();
      let limit = 0;
      switch (i) {
        case 0:
          if (i == dataRed.numero_capas_ocultas) {
            limit = salidas;
          } else {
            limit = dataRed.numero_neuronas_capa_1;
          }
          for (let j = 0; j < limit; j++) {
            pesos[j] = new Array();
            umbrales[j] = numeroAleatorioDecimales(1, -1);
            for (let k = 0; k < entradas; k++) {
              pesos[j][k] = numeroAleatorioDecimales(1, -1);
            }
          }
          break;
        case 1:
          if (i == dataRed.numero_capas_ocultas) {
            limit = salidas;
          } else {
            limit = dataRed.numero_neuronas_capa_2;
          }
          for (let j = 0; j < limit; j++) {
            pesos[j] = new Array();
            umbrales[j] = numeroAleatorioDecimales(1, -1);
            for (let k = 0; k < dataRed.numero_neuronas_capa_1; k++) {
              pesos[j][k] = numeroAleatorioDecimales(1, -1);
            }
          }
          break;
        case 2:
          if (i == dataRed.numero_capas_ocultas) {
            limit = salidas;
          } else {
            limit = dataRed.numero_neuronas_capa_3;
          }
          for (let j = 0; j < limit; j++) {
            pesos[j] = new Array();
            umbrales[j] = numeroAleatorioDecimales(1, -1);
            for (let k = 0; k < dataRed.numero_neuronas_capa_2; k++) {
              pesos[j][k] = numeroAleatorioDecimales(1, -1);
            }
          }
          break;
        case 3:
          if (i == dataRed.numero_capas_ocultas) {
            limit = salidas;
          } else {
            limit = dataRed.numero_neuronas_capa_4;
          }
          for (let j = 0; j < limit; j++) {
            pesos[j] = new Array();
            umbrales[j] = numeroAleatorioDecimales(1, -1);
            for (let k = 0; k < dataRed.numero_neuronas_capa_3; k++) {
              pesos[j][k] = numeroAleatorioDecimales(10, -10);
            }
          }
          break;
        case 4:
          if (i == dataRed.numero_capas_ocultas) {
            limit = salidas;
          } else {
            limit = dataRed.numero_neuronas_capa_5;
          }
          for (let j = 0; j < limit; j++) {
            pesos[j] = new Array();
            umbrales[j] = numeroAleatorioDecimales(1, -1);
            for (let k = 0; k < dataRed.numero_neuronas_capa_4; k++) {
              pesos[j][k] = numeroAleatorioDecimales(10, -10);
            }
          }
          break;
        case 5:
          for (let j = 0; j < salidas; j++) {
            pesos[j] = new Array();
            umbrales[j] = numeroAleatorioDecimales(1, -1);
            for (let k = 0; k < dataRed.numero_neuronas_capa_5; k++) {
              pesos[j][k] = numeroAleatorioDecimales(10, -10);
            }
          }
          break;
        default:
          break;
      }
      ws[`capa${i}`] = { pesos };
      us[`capa${i}`] = { umbrales };
    }
    setWActual(ws);
    setWOld(ws);
    setUActual(us);
    setUOld(us);
    //console.log("Creacion",wActual, uActual);
  }

  const handleSubmit = (dataRed, { reserForm }) => {
    handleEntrenar(dataRed);
    alert(dataRed);
    reserForm({});
  };

  const handleEntrenar = (dataRed) => {
    setData(dataRed);
    cargarBancoDatos(dataRed);
    handdleTraining(dataRed);
    //cargarPesosUmbrales(dataRed);
    //entrenamiento(dataRed);
  };

  const handleW = (x, y, dataConfig) => {
    let m = [];
    for (let i = 0; i <= dataConfig.numero_capas_ocultas; i++) {
      switch (i) {
        case 0:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = generateW(x, y);
          } else {
            m[i] = generateW(x, dataConfig.numero_neuronas_capa_1);
          }
          break;
        case 1:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = generateW(dataConfig.numero_neuronas_capa_1, y);
          } else {
            m[i] = generateW(
              dataConfig.numero_neuronas_capa_1,
              dataConfig.numero_neuronas_capa_2
            );
          }
          break;
        case 2:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = generateW(dataConfig.numero_neuronas_capa_2, y);
          } else {
            m[i] = generateW(
              dataConfig.numero_neuronas_capa_2,
              dataConfig.numero_neuronas_capa_3
            );
          }
          break;
        default:
          console.log("PESOS ERROR");
          break;
      }
    }
    return m;
  };

  const handleU = (y, dataConfig) => {
    let m = [];
    for (let i = 0; i <= dataConfig.numero_capas_ocultas; i++) {
      switch (i) {
        case 0:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = generateU(y);
          } else {
            m[i] = generateU(dataConfig.numero_neuronas_capa_1);
          }
          break;
        case 1:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = generateU(y);
          } else {
            m[i] = generateU(dataConfig.numero_neuronas_capa_2);
          }
          break;
        case 2:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = generateU(y);
          } else {
            m[i] = generateU(dataConfig.numero_neuronas_capa_3);
          }
          break;
        default:
          console.log("UMBRALES ERROR");
      }
    }
    return m;
  };

  const generateW = (x, y) => {
    let gw = [];
    for (let gwi = 0; gwi < y; gwi++) {
      gw[gwi] = new Array();
      for (let gwj = 0; gwj < x; gwj++) {
        gw[gwi][gwj] = Math.random() * (1 - -1) + -1;
      }
    }
    return gw;
  };

  const generateU = (y) => {
    let gu = [];
    for (let gui = 0; gui < y; gui++) {
      gu[gui] = Math.random() * (1 - -1) + -1;
    }
    return gu;
  };

  const handleS = (x, y, pt, we, ue, dataConfig) => {
    let m = [];
    for (let i = 0; i <= dataConfig.numero_capas_ocultas; i++) {
      switch (i) {
        case 0:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getS(x, y, pt, we[i], ue[i]);
          } else {
            m[i] = getS(x, dataConfig.numero_neuronas_capa_1, pt, we[i], ue[i]);
          }
          break;
        case 1:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getS(m[0].length, y, m[0], we[i], ue[i]);
          } else {
            m[i] = getS(
              m[0].length,
              dataConfig.numero_neuronas_capa_2,
              m[0],
              we[i],
              ue[i]
            );
          }
          break;
        case 2:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getS(m[1].length, y, m[0], we[i], ue[i]);
          } else {
            m[i] = getS(
              m[1].length,
              dataConfig.numero_neuronas_capa_3,
              m[0],
              we[i],
              ue[i]
            );
          }
          break;
        default:
          console.log("ERROS EN SUMA");
          break;
      }
    }
    return m;
  };

  const getS = (x, y, pt, we, ue) => {
    let gs = [];
    //console.log(x, y, pt, we, ue);
    for (let gsi = 0; gsi < y; gsi++) {
      gs[gsi] = 0;
      for (let gsj = 0; gsj < x; gsj++) {
        gs[gsi] = gs[gsi] + (pt[gsj] * we[gsi][gsj] + ue[gsi]);
      }
      gs[gsi] = Math.tanh(gs[gsi]);
    }
    //console.log("SUMA: ",gs);
    return gs;
  };

  const handleEL = (y, yr, yd) => {
    let m = [];
    for (let eli = 0; eli < y; eli++) {
      m[eli] = yd[eli] - yr[eli];
    }
    //console.log(m);
    return m;
  };

  const handleEP = (y, el) => {
    let gep = 0;
    for (let epi = 0; epi < y; epi++) {
      gep = gep + Math.abs(el[epi]);
    }
    gep = gep / y;
    //console.log("EP: ",gep);
    return gep;
  };

  const updateW = (x, y, we, ra, ep, el, pt, se, dataConfig) => {
    let m = [];
    for (let i = 0; i <= dataConfig.numero_capas_ocultas; i++) {
      switch (i) {
        case 0:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getUpdateW(x, y, we[i], ra, el, pt, true);
          } else {
            m[i] = getUpdateW(
              x,
              dataConfig.numero_neuronas_capa_1,
              we[i],
              ra,
              ep,
              pt,
              false
            );
          }
          break;
        case 1:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getUpdateW(
              dataConfig.numero_neuronas_capa_1,
              y,
              we[i],
              ra,
              el,
              se[0],
              true
            );
          } else {
            m[i] = getUpdateW(
              dataConfig.numero_neuronas_capa_1,
              dataConfig.numero_neuronas_capa_2,
              we[i],
              ra,
              ep,
              se[0],
              false
            );
          }
          break;
        case 2:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getUpdateW(
              dataConfig.numero_neuronas_capa_2,
              y,
              we[i],
              ra,
              el,
              se[1],
              true
            );
          } else {
            m[i] = getUpdateW(
              dataConfig.numero_neuronas_capa_2,
              dataConfig.numero_neuronas_capa_3,
              we[i],
              ra,
              ep,
              se[1],
              false
            );
          }
          break;
        default:
          console.log("UPDATE PESOS ERROR");
      }
    }
    //console.log("M: ",m);
    return m;
  };

  const getUpdateW = (x, y, we, ra, e, pt, isEnd) => {
    let ugw = [];
    for (let gwi = 0; gwi < y; gwi++) {
      ugw[gwi] = new Array();
      for (let gwj = 0; gwj < x; gwj++) {
        if (isEnd) {
          ugw[gwi][gwj] = we[gwi][gwj] + ra * e[gwi] * pt[gwj];
        } else {
          ugw[gwi][gwj] = we[gwi][gwj] + ra * e * pt[gwj];
        }
      }
    }
    //console.log("NEW W:", ugw);
    return ugw;
  };

  const updateU = (y, ue, ra, ep, el, dataConfig) => {
    let m = [];
    for (let i = 0; i <= dataConfig.numero_capas_ocultas; i++) {
      switch (i) {
        case 0:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getUpdateU(y, ue[i], ra, el, true);
          } else {
            m[i] = getUpdateU(
              dataConfig.numero_neuronas_capa_1,
              ue[i],
              ra,
              ep,
              false
            );
          }
          break;
        case 1:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getUpdateU(y, ue[i], ra, el, true);
          } else {
            m[i] = getUpdateU(
              dataConfig.numero_neuronas_capa_2,
              ue[i],
              ra,
              ep,
              false
            );
          }
          break;
        case 2:
          if (i == dataConfig.numero_capas_ocultas) {
            m[i] = getUpdateU(y, ue[i], ra, el, true);
          } else {
            m[i] = getUpdateU(
              dataConfig.numero_neuronas_capa_3,
              ue[i],
              ra,
              ep,
              false
            );
          }
          break;
        default:
          console.log("UPDATE UMBRALES ERROR");
      }
    }
    //console.log("M: ",m);
    return m;
  };

  const getUpdateU = (y, ue, ra, e, isEnd) => {
    let ugu = [];
    for (let gui = 0; gui < y; gui++) {
      if (isEnd) {
        ugu[gui] = ue[gui] + ra * e[gui];
      } else {
        ugu[gui] = ue[gui] + ra * e;
      }
    }
    //console.log("NEW W:", ugw);
    return ugu;
  };

  const handdleTraining = async (dataRed) => {
    let numberIn = json.entrada[0].length;
    let numberOut = json.salida[0].length;
    let numberPatters = json.entrada.length;
    let w = handleW(numberIn, numberOut, dataRed);
    let u = handleU(numberOut, dataRed);
    let s = [];
    let erms = 2;
    let iteraccion = 0;
    let errorPatters = [];
    yValue = [];
    xValue = [];
    //console.log("INIT W: ", w);
    //console.log("INIT U: ", u);
    while (
      iteraccion < dataRed.numero_iteracciones &&
      erms > dataRed.error_max
    ) {
      iteraccion = iteraccion + 1;
      xValue[iteraccion] = iteraccion + "";
      for (let p = 0; p < numberPatters; p++) {
        //console.log("PATRON #", p, ": ", json.entrada[p]);
        //CaLCULAMOS LA SALIDA DE LA FUNCION SOMA MAS FUNCION DE ACTIVACION
        s = handleS(numberIn, numberOut, json.entrada[p], w, u, dataRed);
        //console.log("S: ",s);
        //CALCULAMOS EL ERROR LINEAL
        let errorLineal = handleEL(
          numberOut,
          s[dataRed.numero_capas_ocultas],
          json.salida[p]
        );
        //console.log("EL: ", errorLineal);
        //CALCULAMOS EL ERROR DEL PATRON
        errorPatters[p] = handleEP(numberOut, errorLineal);
        //VALIDAMOS SI MODIFICAMOS PESOS
        if (errorPatters[p] > dataRed.error_max) {
          //console.log("MODIFICAR PESOS Y UMBRALES");
          //console.log("W: ", w);
          //console.log("U: ", u);
          //console.log("I: ", iteraccion);
          w = updateW(
            numberIn,
            numberOut,
            w,
            dataRed.rata_aprendizaje,
            errorPatters[p],
            errorLineal,
            json.entrada[p],
            s,
            dataRed
          );
          u = updateU(
            numberOut,
            u,
            dataRed.rata_aprendizaje,
            errorPatters[p],
            errorLineal,
            dataRed
          );
          //console.log("NEW W: ", w);
          //console.log("NEW U: ", u);
        }
      }
      //console.log("EP: ",errorPatters);
      erms = 0;
      for (let p = 0; p < numberPatters; p++) {
        erms = erms + errorPatters[p];
      }
      erms = erms / numberPatters;
      yValue[iteraccion] = erms;
      endErms = erms;
      iteracciones = iteraccion;
    }
    setYErms(yValue);
    setXIteraccion(xValue);
    console.log("Y: ", yValue);
    console.log("X: ", xValue);
    console.log("ERMS: ", erms);
    console.log("EP: ", errorPatters);
    console.log("END W: ", w);
    if (erms > dataRed.error_max) {
      redEntrenada = "NO";
    } else {
      redEntrenada = "SI";
    }
    await console.log("END U: ", u);
  };

  const formik = useFormik({
    initialValues: {
      numero_iteracciones: 1,
      error_max: 0,
      rata_aprendizaje: 0,
      banco_datos: "",
      algoritmo_entrenamiento: "n",
      funcion_activacion: "n",
      numero_capas_ocultas: 1,
      numero_neuronas_capa_1: 1,
      funcion_activacion_capa_1: "tanh",
      numero_neuronas_capa_2: 1,
      funcion_activacion_capa_2: "tanh",
      numero_neuronas_capa_3: 1,
      funcion_activacion_capa_3: "tanh",
      numero_neuronas_capa_4: 1,
      funcion_activacion_capa_4: "tanh",
      numero_neuronas_capa_5: 1,
      funcion_activacion_capa_5: "tanh",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={4}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container>
                <Grid item xs={6} md={4} xl={6}>
                  <div className={"panel shadow"}>
                    <div className={"header"}>
                      <Typography variant="h6" className={"title"}>
                        Parametros de entrenamiento
                      </Typography>
                    </div>
                    <div className={"inside"}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={12}
                          xl={12}
                          className={"input"}
                        >
                          <TextField
                            fullWidth
                            id="numero_iteracciones"
                            name="numero_iteracciones"
                            label="Número de iteracciones"
                            type="number"
                            size="small"
                            onChange={formik.handleChange}
                            valule={formik.values.numero_iteracciones}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {formik.errors.numero_iteracciones &&
                          formik.touched.numero_iteracciones ? (
                            <div className={"warning"}>
                              {formik.errors.numero_iteracciones}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} md={4} xl={12} className={"input"}>
                          <TextField
                            fullWidth
                            id="error_max"
                            name="error_max"
                            onChange={formik.handleChange}
                            value={formik.values.error_max}
                            label="Error maximo permitido"
                            type="number"
                            size="small"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {formik.errors.error_max &&
                          formik.touched.error_max ? (
                            <div className={"warning"}>
                              {formik.errors.error_max}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} md={4} xl={12} className={"input"}>
                          <TextField
                            fullWidth
                            id="rata_aprendizaje"
                            name="rata_aprendizaje"
                            onChange={formik.handleChange}
                            value={formik.values.rata_aprendizaje}
                            label="Rata de aprendizaje"
                            type="number"
                            size="small"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {formik.errors.rata_aprendizaje &&
                          formik.touched.rata_aprendizaje ? (
                            <div className={"warning"}>
                              {formik.errors.rata_aprendizaje}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} md={4} xl={12} className={"input"}>
                          <Button
                            fullWidth
                            variant="contained"
                            component="label"
                          >
                            Banco de datos
                            <input
                              type="file"
                              id="banco_datos"
                              name="banco_datos"
                              onChange={formik.handleChange}
                              value={formik.values.banco_datos}
                              hidden
                            />
                          </Button>
                          {formik.errors.banco_datos &&
                          formik.touched.banco_datos ? (
                            <div className={"warning"}>
                              {formik.errors.banco_datos}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div className={"panel shadow"}>
                    <div className={"header"}>
                      <Typography variant="h6" className={"title"}>
                        Configuracion de la red
                      </Typography>
                    </div>
                    <div className={"inside"}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={12}
                          xl={12}
                          className={"input"}
                        >
                          <FormControl fullWidth>
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                            >
                              Funcion de activacion
                            </InputLabel>
                            <NativeSelect
                              defaultValue={"n"}
                              onChange={formik.handleChange}
                              value={formik.values.funcion_activacion}
                              inputProps={{
                                name: "funcion_activacion",
                                id: "funcion_activacion",
                              }}
                            >
                              <option value={"n"}>SELECCIONAR</option>
                              <option value={"tanh"}>
                                Tangente Hipervolica
                              </option>
                            </NativeSelect>
                          </FormControl>
                          {formik.errors.funcion_activacion &&
                          formik.touched.funcion_activacion ? (
                            <div className={"warning"}>
                              {formik.errors.funcion_activacion}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} md={4} xl={12} className={"input"}>
                          <FormControl fullWidth>
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                            >
                              Algoritmo de entrenamiento
                            </InputLabel>
                            <NativeSelect
                              defaultValue={"n"}
                              onChange={formik.handleChange}
                              value={formik.values.algoritmo_entrenamiento}
                              inputProps={{
                                name: "algoritmo_entrenamiento",
                                id: "algoritmo_entrenamiento",
                              }}
                            >
                              <option value={"n"}>SELECCIONAR</option>
                              <option value={"rdm"}>
                                Regla delta modificada
                              </option>
                            </NativeSelect>
                          </FormControl>
                          {formik.errors.algoritmo_entrenamiento &&
                          formik.touched.algoritmo_entrenamiento ? (
                            <div className={"warning"}>
                              {formik.errors.algoritmo_entrenamiento}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} md={4} xl={12} className={"input"}>
                          <TextField
                            fullWidth
                            id="numero_capas_ocultas"
                            name="numero_capas_ocultas"
                            label="Numero de capas ocultas"
                            type="number"
                            size="small"
                            onChange={formik.handleChange}
                            value={formik.values.numero_capas_ocultas}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {formik.errors.numero_capas_ocultas &&
                          formik.touched.numero_capas_ocultas ? (
                            <div className={"warning"}>
                              {formik.errors.numero_capas_ocultas}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} md={4} xl={6}>
                  {formik.values.numero_capas_ocultas &&
                  formik.values.numero_capas_ocultas >= 1 ? (
                    <div className={"mleft10 panel shadow "}>
                      <div className={"header"}>
                        <Typography variant="h6" className={"title"}>
                          Configuracion Capa #1
                        </Typography>
                      </div>
                      <div className="inside">
                        <FormControl className={"input"} size="small" fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Funcion de activacion
                          </InputLabel>
                          <NativeSelect
                            defaultValue={"n"}
                            onChange={formik.handleChange}
                            value={formik.values.funcion_activacion_capa_1}
                            inputProps={{
                              name: "funcion_activacion_capa_1",
                              id: "funcion_activacion_capa_1",
                            }}
                          >
                            <option value={"n"}>SELECCIONAR</option>
                            <option value={"tanh"}>Tangente Hipervolica</option>
                          </NativeSelect>
                        </FormControl>
                        {formik.errors.funcion_activacion_capa_1 &&
                        formik.touched.funcion_activacion_capa_1 ? (
                          <div className={"warning"}>
                            {formik.errors.funcion_activacion_capa_1}
                          </div>
                        ) : null}
                        <TextField
                          className={"input"}
                          fullWidth
                          id="numero_neuronas_capa_1"
                          name="numero_neuronas_capa_1"
                          label="Numero de neuronas"
                          type="number"
                          size="small"
                          onChange={formik.handleChange}
                          value={formik.values.numero_neuronas_capa_1}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {formik.errors.numero_neuronas_capa_1 &&
                        formik.touched.numero_neuronas_capa_1 ? (
                          <div className={"warning"}>
                            {formik.errors.numero_neuronas_capa_1}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  {formik.values.numero_capas_ocultas &&
                  formik.values.numero_capas_ocultas >= 2 ? (
                    <div className={"mleft10 panel shadow "}>
                      <div className={"header"}>
                        <Typography variant="h6" className={"title"}>
                          Configuracion Capa #2
                        </Typography>
                      </div>
                      <div className="inside">
                        <FormControl className={"input"} size="small" fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Funcion de activacion
                          </InputLabel>
                          <NativeSelect
                            defaultValue={"n"}
                            onChange={formik.handleChange}
                            value={formik.values.funcion_activacion_capa_2}
                            inputProps={{
                              name: "funcion_activacion_capa_2",
                              id: "funcion_activacion_capa_2",
                            }}
                          >
                            <option value={"n"}>SELECCIONAR</option>
                            <option value={"tanh"}>Tangente Hipervolica</option>
                          </NativeSelect>
                        </FormControl>
                        {formik.errors.funcion_activacion_capa_2 &&
                        formik.touched.funcion_activacion_capa_2 ? (
                          <div className={"warning"}>
                            {formik.errors.funcion_activacion_capa_2}
                          </div>
                        ) : null}
                        <TextField
                          className={"input"}
                          fullWidth
                          id="numero_neuronas_capa_2"
                          name="numero_neuronas_capa_2"
                          label="Numero de neuronas"
                          type="number"
                          size="small"
                          onChange={formik.handleChange}
                          value={formik.values.numero_neuronas_capa_2}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {formik.errors.numero_neuronas_capa_2 &&
                        formik.touched.numero_neuronas_capa_2 ? (
                          <div className={"warning"}>
                            {formik.errors.numero_neuronas_capa_2}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  {formik.values.numero_capas_ocultas &&
                  formik.values.numero_capas_ocultas >= 3 ? (
                    <div className={"mleft10 panel shadow "}>
                      <div className={"header"}>
                        <Typography variant="h6" className={"title"}>
                          Configuracion Capa #3
                        </Typography>
                      </div>
                      <div className="inside">
                        <FormControl className={"input"} size="small" fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Funcion de activacion
                          </InputLabel>
                          <NativeSelect
                            defaultValue={"n"}
                            onChange={formik.handleChange}
                            value={formik.values.funcion_activacion_capa_3}
                            inputProps={{
                              name: "funcion_activacion_capa_3",
                              id: "funcion_activacion_capa_3",
                            }}
                          >
                            <option value={"n"}>SELECCIONAR</option>
                            <option value={"tanh"}>Tangente Hipervolica</option>
                          </NativeSelect>
                        </FormControl>
                        {formik.errors.funcion_activacion_capa_3 &&
                        formik.touched.funcion_activacion_capa_3 ? (
                          <div className={"warning"}>
                            {formik.errors.funcion_activacion_capa_3}
                          </div>
                        ) : null}
                        <TextField
                          className={"input"}
                          fullWidth
                          id="numero_neuronas_capa_3"
                          name="numero_neuronas_capa_3"
                          label="Numero de neuronas"
                          type="number"
                          size="small"
                          onChange={formik.handleChange}
                          value={formik.values.numero_neuronas_capa_3}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {formik.errors.numero_neuronas_capa_3 &&
                        formik.touched.numero_neuronas_capa_3 ? (
                          <div className={"warning"}>
                            {formik.errors.numero_neuronas_capa_3}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  {formik.values.numero_capas_ocultas &&
                  formik.values.numero_capas_ocultas >= 4 ? (
                    <div className={"mleft10 panel shadow "}>
                      <div className={"header"}>
                        <Typography variant="h6" className={"title"}>
                          Configuracion Capa #4
                        </Typography>
                      </div>
                      <div className="inside">
                        <FormControl className={"input"} size="small" fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Funcion de activacion
                          </InputLabel>
                          <NativeSelect
                            defaultValue={"n"}
                            onChange={formik.handleChange}
                            value={formik.values.funcion_activacion_capa_4}
                            inputProps={{
                              name: "funcion_activacion_capa_4",
                              id: "funcion_activacion_capa_4",
                            }}
                          >
                            <option value={"n"}>SELECCIONAR</option>
                            <option value={"tanh"}>Tangente Hipervolica</option>
                          </NativeSelect>
                        </FormControl>
                        {formik.errors.funcion_activacion_capa_4 &&
                        formik.touched.funcion_activacion_capa_4 ? (
                          <div className={"warning"}>
                            {formik.errors.funcion_activacion_capa_4}
                          </div>
                        ) : null}
                        <TextField
                          className={"input"}
                          fullWidth
                          id="numero_neuronas_capa_4"
                          name="numero_neuronas_capa_4"
                          label="Numero de neuronas"
                          type="number"
                          size="small"
                          onChange={formik.handleChange}
                          value={formik.values.numero_neuronas_capa_4}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {formik.errors.numero_neuronas_capa_4 &&
                        formik.touched.numero_neuronas_capa_4 ? (
                          <div className={"warning"}>
                            {formik.errors.numero_neuronas_capa_4}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  {formik.values.numero_capas_ocultas &&
                  formik.values.numero_capas_ocultas >= 5 ? (
                    <div className={"mleft10 panel shadow "}>
                      <div className={"header"}>
                        <Typography variant="h6" className={"title"}>
                          Configuracion Capa #5
                        </Typography>
                      </div>
                      <div className="inside">
                        <FormControl className={"input"} size="small" fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Funcion de activacion
                          </InputLabel>
                          <NativeSelect
                            defaultValue={"n"}
                            onChange={formik.handleChange}
                            value={formik.values.funcion_activacion_capa_4}
                            inputProps={{
                              name: "funcion_activacion_capa_5",
                              id: "funcion_activacion_capa_5",
                            }}
                          >
                            <option value={"n"}>SELECCIONAR</option>
                            <option value={"tanh"}>Tangente Hipervolica</option>
                          </NativeSelect>
                        </FormControl>
                        {formik.errors.funcion_activacion_capa_5 &&
                        formik.touched.funcion_activacion_capa_5 ? (
                          <div className={"warning"}>
                            {formik.errors.funcion_activacion_capa_5}
                          </div>
                        ) : null}
                        <TextField
                          className={"input"}
                          fullWidth
                          id="numero_neuronas_capa_5"
                          name="numero_neuronas_capa_5"
                          label="Numero de neuronas"
                          type="number"
                          size="small"
                          onChange={formik.handleChange}
                          value={formik.values.numero_neuronas_capa_5}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {formik.errors.numero_neuronas_capa_5 &&
                        formik.touched.numero_neuronas_capa_5 ? (
                          <div className={"warning"}>
                            {formik.errors.numero_neuronas_capa_5}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
              <Button fullWidth variant="contained" type={"submit"}>
                entrenar red
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6} xl={8}>
            <Grid container>
              <Grid item xs={12} md={6} xl={4}>
                <div className={"panel shadow"}>
                  <div className={"header"}>
                    <Typography variant="h6" className={"title"}>
                      Datos del entrenamiento
                    </Typography>
                  </div>
                  <div className={"inside"}>
                    <Typography variant="subtitle2">
                      Número de iteracciones:{" "}
                      {formik.values.numero_iteracciones}
                    </Typography>
                    <Typography variant="subtitle2">
                      Error maximo permitido: {formik.values.error_max}
                    </Typography>
                    <Typography variant="subtitle2">
                      Rata de aprendizaje: {formik.values.rata_aprendizaje}
                    </Typography>
                    <Typography variant="subtitle2">
                      Número de entradas: {entradas}
                    </Typography>
                    <Typography variant="subtitle2">
                      Número de salidas: {salidas}
                    </Typography>
                    <Typography variant="subtitle2">
                      Número de patrones: {patrones}
                    </Typography>
                    <Typography variant="subtitle2">
                      Función de activación: {formik.values.funcion_activacion}
                    </Typography>
                    <Typography variant="subtitle2">
                      Algoritmo de entrenamiento:{" "}
                      {formik.values.algoritmo_entrenamiento}
                    </Typography>
                    <Typography variant="subtitle2">
                      Número de capas ocultas:{" "}
                      {formik.values.numero_capas_ocultas}
                    </Typography>
                  </div>
                </div>
                <div className={"panel shadow"}>
                  <div className={"header"}>
                    <Typography variant="h6" className={"title"}>
                      Resultados del entrenamiento
                    </Typography>
                  </div>
                  <div className={"inside"}>
                    <Typography variant="subtitle2">
                      Iteracciones realizadas: {iteracciones}
                    </Typography>
                    <Typography variant="subtitle2">
                      Error ERMS final: {endErms}
                    </Typography>
                    <Typography variant="subtitle2">
                      Red entrenada?: {redEntrenada}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6} xl={8}>
                <div className={"panel shadow mleft10"}>
                  <div className="header">
                    <Typography variant="h6" className={"title"}>
                      Grafica ERMS
                    </Typography>
                  </div>
                  <div className="inside">
                    <Line
                      data={{
                        labels: xValue,
                        datasets: [
                          {
                            label: "ERMS",
                            data: yValue,
                            backgroundColor: [
                              "rgba(255, 99, 132, 0.2)",
                              "rgba(54, 162, 235, 0.2)",
                              "rgba(255, 206, 86, 0.2)",
                              "rgba(75, 192, 192, 0.2)",
                              "rgba(153, 102, 255, 0.2)",
                              "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                              "rgba(255, 99, 132, 1)",
                              "rgba(54, 162, 235, 1)",
                              "rgba(255, 206, 86, 1)",
                              "rgba(75, 192, 192, 1)",
                              "rgba(153, 102, 255, 1)",
                              "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      height={200}
                      width={400}
                      options={{}}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PerceptronEntrenamiento;
