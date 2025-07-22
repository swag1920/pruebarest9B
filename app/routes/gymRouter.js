const express = require('express');
const router = express.Router();
const controller = require('../controllers/ejercicioController'); 

router.get('/ejercicios', controller.buscarTodo)
      .post('/ejercicios', controller.guardarEjercicio)
      .get('/ejercicios/:key/:value', controller.buscarEjercicio, controller.mostrarEjercicio)
      .delete('/ejercicios/:key/:value', controller.buscarEjercicio, controller.eliminarEjercicio)
      .put('/ejercicios/:key/:value', controller.buscarEjercicio, controller.actualizarEjercicio);

module.exports = router;
