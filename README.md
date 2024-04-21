# Express starter

A clean starter setup for express, ideal for quickly setting up backend systems and more.

> [!IMPORTANT]
> It is recommended to use Node v16 or newer.

### ▲ Deploying to Vercel

To deploy this app to Vercel, create a config similar to the one shown below.

```json
{
    "name": "NAME",
    "version": 2,
    "builds": [
        {
            "src": "/src/index.ts",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/src/index.ts"
        }
    ]
}
```
