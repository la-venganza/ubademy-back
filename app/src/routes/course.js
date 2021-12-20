const express = require('express');
const verifyIdToken = require('../middlewares/firebase');
const subscriptionPlanService = require('../middlewares/subscriptionPlanService');
const walletService = require('../middlewares/walletService');
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
  try {
    const course = await courseService.getCourseById(req.params.id, req.body);
    let teacher_id = '';
    let courseSubscription = ''
    if (course.data != '') {
      teacher_id = course.creator_id;
      courseSubscription = course.subscription_required;
    }

    let subscription = ''
    if (courseSubscription.title != "Free" && courseSubscription != '') {
      subscription = await subscriptionPlanService.getSubscriptionPlan(courseSubscription.id);
    }

    let subscription_price = 0;
    if (subscription.data != '') {
      subscription_price = subscription.price
    }

    const depositBody = {
      amount: `${subscription_price/10}`,
    };

    const response = await courseService.addRegistration(req.params.id, req.body);

    if (subscription_price != 0) {
      await walletService.payTeacher(teacher_id, depositBody);
    }

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
