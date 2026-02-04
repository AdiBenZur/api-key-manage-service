import { type Request, type Response } from 'express';
import * as apiKeyService from '../services/apiKeyService.js';

// First 
export const handleCreateKey = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required in the request body."});
        }
        if (name.trim().length === 0) {
            return res.status(400).json({ error: "name cannot be empty."});
        }
        if (name.length > 60) {
            return res.status(400).json({ error: "Name must be at most 60 characters long."});
        }
        if (typeof accountId !== 'string') {
            return res.status(400).json({ error: "Invalid account ID."});
        }

        const result = await apiKeyService.createKey(accountId, name);
        return res.status(201).json(result);
    } catch (error) {
        console.error("Error in handle create Key:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

// Second
export const handleListKeys = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params;

        if (!accountId || typeof accountId !== 'string') {
            return res.status(400).json({ error: "Invalid account ID." });
        }

        const keys = await apiKeyService.listKeys(accountId);
        return res.status(200).json(keys);
    } catch (error) {
        console.error("Error in handle list keys:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

// Third
export const handleRevokeKey = async (req: Request, res: Response) => {
    try {
        const { accountId, id } = req.params;

        if (!accountId || !id) {
            return res.status(400).json({ error: "Missing accountId or keyId." });
        }

        if (!accountId || typeof accountId !== 'string') {
            return res.status(400).json({ error: "Invalid account ID." });
        }

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: "Invalid id." });
        }

        const updatedKey = await apiKeyService.revokeKey(accountId, id);
        return res.status(200).json(updatedKey);

    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "API Key not found or does not belong to this account."});
        }
        else {
            console.error("Error in handle revoke Key:", error);
            return res.status(500).json({ error: "Internal Server Error." });
        }  
    }
};