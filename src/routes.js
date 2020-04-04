import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import TimesheetController from './app/controllers/TimesheetController';
import ProviderTimesheetController from './app/controllers/ProviderTimesheetController';

import Auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * External routes
 */
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(Auth.isUserAuthenticated);
/**
 * Internal routes
 */
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

// User appointments
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// Provider schedule
routes.get('/schedule', ScheduleController.index);

//  Timesheet
routes.get('/timesheet', TimesheetController.index);
routes.get('/provider/timesheet', ProviderTimesheetController.index);
routes.post('/provider/timesheet', ProviderTimesheetController.store);
routes.delete('/provider/timesheet/:id', ProviderTimesheetController.delete);

// Notification provider
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
