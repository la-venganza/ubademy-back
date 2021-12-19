const express = require('express');
const verifyIdToken = require('../middlewares/firebase');
const courseService = require('../middlewares/courseService');
const courseMapper = require('../utils/requestMapper');

const ConnectionError = require('../errors/connectionError');
const AuthError = require('../errors/authError');
const ServerError = require('../errors/serverError');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await courseService.getCourses(req.query);

    res.status(200).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

router.get('/:id', async (req, res) => {
  // Verifica que el token de firebase sea valido
  try {
    const response = await courseService.getCourseById(req.params.id, req.query);

    res.status(200).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

router.post('/', async (req, res) => {
  // Verificar request y mandar al back de python
  try {
    const body = courseMapper.courseMappingPost(req.body);

    const response = await courseService.createCourse(body);

    res.status(201).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

router.patch('/:id', async (req, res) => {
  // Verificar request y mandar al back de python
  try {
    const body = courseMapper.courseMappingPatch(req.body);

    const response = await courseService.updateCourse(req.params.id, body);

    // Send to back
    res.status(201).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

router.post('/:id/registration', async (req, res) => {
  // Verificar request y mandar al back de python
  try {
    const uid = await verifyIdToken(req.cookies.firebaseAuth)
    const course = await courseService.getCourseById(req.params.id, req.body);
    // let teacher_id = '';
    // if (course.data != '') {
    //   const parsedCourse = JSON.parse(JSON.stringify(subscriptions.data));
    //   teacher_id = parsedCourse.creator_id;
    // }
    // const payment = await walletService.payTeacher(teacher_id);
    const response = await courseService.addRegistration(req.params.id, req.body);

    // Send to back
    res.status(201).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

router.patch('/:id/registration', async (req, res) => {
  // Verificar request y mandar al back de python
  try {
    const response = await courseService.undoRegistration(req.params.id, req.body);

    // Send to back
    res.status(201).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

router.post('/:id/collaboration', async (req, res) => {
  // Verificar request y mandar al back de python
  try {
    const response = await courseService.addCollaborator(req.params.id, req.body);

    // Send to back
    res.status(201).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

router.get('/types', async (req, res) => {
  // Verifica que el token de firebase sea valido
  try {
    const response = await courseService.getTypes();

    res.status(200).send(response);
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

module.exports = router;
