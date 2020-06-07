import express from "express";

// Our Express APP config
const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});

export default app;
