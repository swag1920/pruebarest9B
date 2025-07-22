const ejercicioModel = require('../models/EjerciciosModel');


function buscarTodo(req, res) {
    ejercicioModel.find({})
        .then(ejercicios => {
            if (ejercicios.length) {
                return res.status(200).send({ ejercicios });
            }
            return res.status(204).send({ mensaje: "No hay información que mostrar" });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al buscar la información: ${e}` });
        });
}


function guardarEjercicio(req, res) {
    console.log(req.body);
    new ejercicioModel(req.body).save()
        .then(info => {
            return res.status(200).send({ mensaje: "Información guardada con éxito", info });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: "Error al guardar la información", e });
        });
}


function buscarEjercicio(req, res, next) {
    let consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.find(consulta)
        .then(info => {
            if (!info.length) return next();
            res.locals.ejercicios = info;
            return next();
        })
        .catch(e => {
            res.locals.e = e;
            next();
        });
}


function mostrarEjercicio(req, res) {
    if (res.locals.e) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: res.locals.e
        });
    }

    if (!res.locals.ejercicios) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ ejercicios: res.locals.ejercicios });
}


function eliminarEjercicio(req, res) {
    if (res.locals.e) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: res.locals.e
        });
    }

    if (!res.locals.ejercicios || res.locals.ejercicios.length === 0) {
        return res.status(204).send({ mensaje: "No hay información que eliminar" });
    }

    const consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.findOneAndDelete(consulta)
        .then(info => {
            return res.status(200).send({ mensaje: "Información eliminada", info });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al eliminar la información", e });
        });
}


function actualizarEjercicio(req, res) {
    if (res.locals.e) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: res.locals.e
        });
    }

    if (!res.locals.ejercicios || res.locals.ejercicios.length === 0) {
        return res.status(204).send({ mensaje: "No hay información que actualizar" });
    }

    const consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.findOneAndUpdate(consulta, req.body, { new: true })
        .then(info => {
            return res.status(200).send({ mensaje: "Información actualizada", info });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al actualizar la información", e });
        });
}

module.exports = {
    buscarTodo,
    guardarEjercicio,
    buscarEjercicio,
    mostrarEjercicio,
    eliminarEjercicio,
    actualizarEjercicio
};
