import fs from 'fs';
import { resolve } from 'path';
import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists. ' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Inform a valid email address'),
      avatar_id: Yup.number(),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword
          ? field
              .required('New password is required')
              .min(6, 'Password needs to be at least 6 characters long')
          : field
      ),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('Password Confirmation is required')
              .oneOf(
                [Yup.ref('password')],
                'Password confirmation does not match'
              )
          : field
      ),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const { email, oldPassword, avatar_id } = req.body;

    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path'],
        },
      ],
    });

    if (avatar_id && avatar_id !== user.avatar_id) {
      console.log('Deleting old avatar');

      const file = await File.findByPk(user.avatar_id);

      if (file) {
        await file.destroy();

        fs.unlinkSync(
          resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            user.avatar.path
          )
        );
      }
    }

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists. ' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json({ id, name, email, avatar });
  }
}

export default new UserController();
