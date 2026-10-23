/**
 * MSW browser worker setup.
 * This file is used by the client-side to start the mock service worker.
 */

import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)