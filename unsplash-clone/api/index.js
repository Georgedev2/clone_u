import app from '../server';
export default app;

// { "version": 2, "rewrites": [{ "source": "/(.*)", "destination": "/api" }] } 
// redirect /ANYTHING into our /api folder
// any request that comes to this app will be server by 