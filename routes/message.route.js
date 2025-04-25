import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { messageValidation } from '../middlewares/message.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
import { chatGeneration } from '../middlewares/ai.middleware.js';
import { sendMessage, getAllMessages, deleteMessage } from '../controllers/message.controller.js';

const router = Router();

// Route to send a message
router.post('/send-message', messageValidation, upload.none(), verifyJWT, chatGeneration, sendMessage);
router.get('/get-messages', verifyJWT, getAllMessages);
router.delete('/delete-message/:receiverId', verifyJWT, deleteMessage);

export default router;
