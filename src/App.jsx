import Master from "./components/master";
import { Provider } from "react-redux";
import generateStore from "./redux/store";
import theme from "./themeConfig"
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Master />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
