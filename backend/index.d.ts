// types.d.ts

import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            rootDir?: string;
            requestAt?: Date;
        }
    }
}
