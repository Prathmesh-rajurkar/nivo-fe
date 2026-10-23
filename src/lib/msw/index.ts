/**
 * MSW browser setup for Nivo.
 * This registers the service worker in development.
 */

let mswInitialized = false

export async function initializeMSW() {
  if (process.env.NODE_ENV !== "development") return
  if (mswInitialized) return

  try {
    const { worker } = await import("./browser")
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    })
    mswInitialized = true
    console.log("[MSW] Mock Service Worker started")
  } catch (error: any) {
    // Ignore "already enabled" error - this can happen during hot reload
    if (error?.message?.includes("already enabled") || error?.message?.includes("configure")) {
      mswInitialized = true
      console.log("[MSW] Already started (likely hot reload)")
      return
    }
    console.error("[MSW] Failed to start:", error)
  }
}