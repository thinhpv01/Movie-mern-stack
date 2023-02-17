import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.config";
import { ToastContainer } from "react-toastify";
function App() {
  const themeMode = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      >
        <CssBaseline />
      </ToastContainer>
    </ThemeProvider>
  );
}

export default App;
