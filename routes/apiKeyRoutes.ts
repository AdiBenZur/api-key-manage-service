import { Router } from 'express';
import { handleCreateKey , handleListKeys, handleRevokeKey, handleVerifyKey } from '../controllers/apiKeyController.js';

const router = Router();

// First endpoint
router.post('/accounts/:accountId/keys', handleCreateKey);

// Second endpoint
router.get('/accounts/:accountId/keys', handleListKeys);

// Third endpoint
router.post('/accounts/:accountId/keys/:id/revoke', handleRevokeKey);

router.get('/auth/verify', handleVerifyKey)

export default router;