const express = require('express');
const userService = require('../middlewares/userService')
const walletService = require('../middlewares/walletService')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const response = await userService.getUsers(req.query);
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
    const response = await userService.getUserById(req.params.id, req.query);
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

router.get('/login/:email', async (req, res) => {
  try {
    let response = await userService.getUserByEmail(req.params.email);

    if (response.results.length === 0) {
      throw new ServerError('Error', 'User not found', 404);
    }

    if (req.query.properties) {
      response = await userService.getUserById(response.results[0].user_id, req.query);
    }

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

router.get('/admin/:email', async (req, res) => {
  try {
    const response = await userService.getAdminByEmail(req.params.email);

    if (response.results.length === 0) {
      throw new ServerError('Error', 'User not found', 404);
    }

    if (!response.results[0].is_admin) {
      throw new AuthError(Error, 'You are not an admin user', 401);
    }

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

router.post('/', async function(req, res) {
    try {
        const response = await userService.createUser(req.body)

        const wallet = await walletService.createWallet(response.user_id)

        res.status(201).send(response)
    } catch (e) {
        const body = {
            error: e.name,
            message: e.message
        }
        if (e instanceof ConnectionError) {
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            res.status(401).send(body)
        } else if (e instanceof ServerError) {
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
});

router.put('/:id', async (req, res) => {
  try {
    const response = await userService.updateUser(req.params.id, req.body);
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

module.exports = router;
