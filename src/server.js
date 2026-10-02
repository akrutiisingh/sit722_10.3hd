const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// APP_VERSION passed via ENV or defaults to Stable
const APP_VERSION = process.env.APP_VERSION || "v1.0.0 (Production - Stable)";
const IS_CANARY = process.env.IS_CANARY === "true";

app.get('/', (req, res) => {
  const bgColor = IS_CANARY ? '#e6fffa' : '#ebf8ff';
  const badgeColor = IS_CANARY ? '#319795' : '#3182ce';

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SIT722 Canary Deployment</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: ${bgColor}; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          .card { background: white; padding: 2rem 3rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
          .badge { background: ${badgeColor}; color: white; padding: 0.6rem 1.2rem; border-radius: 20px; font-size: 1.2rem; font-weight: bold; margin-top: 1rem; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>SIT722 Task 10.3HD DevOps Demonstration</h1>
          <p>Progressive Canary Traffic Routing Control</p>
          <div class="badge">${APP_VERSION}</div>
        </div>
      </body>
    </html>
  `);
});

// Health gate for GitHub Actions synthetic probes
app.get('/api/health', (req, res) => {
  if (process.env.FORCE_FAIL === "true") {
    return res.status(500).json({ status: "FAIL", error: "Synthetic Canary Fault Injected" });
  }
  res.status(200).json({ status: "OK", version: APP_VERSION });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));