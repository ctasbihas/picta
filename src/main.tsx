import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthPrivider from "./context/AuthContext";
import QueryProvider from "./lib/react-query/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<QueryProvider>
			<AuthPrivider>
				<App />
			</AuthPrivider>
		</QueryProvider>
	</BrowserRouter>
);
