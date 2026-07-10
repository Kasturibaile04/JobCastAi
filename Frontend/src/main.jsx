import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { InterviewProvider } from "./features/interview/interview.context";
import "./style.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  </StrictMode>
);