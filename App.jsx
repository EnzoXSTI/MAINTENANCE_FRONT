import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login1 from "./Components/Login1/Login1.jsx";
import CadastroPro from "./Components/CadastroPro/Cadastro.jsx";
import Verificacao from "./Components/Verificacao/VerificacaoCodigo.jsx"
import EnviarCodigo from "./Components/EnviarCodigo/EnviarCodigo.jsx";
import RedefinirSenha from "./Components/RedefinirSenha/RedefinirSenha.jsx";
import EditarPerfil from "./Components/EditarPro/EditarPerfil.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login1 />} />
                <Route path="/cadastro" element={<CadastroPro />} />
                <Route path="/verificacao" element={<Verificacao />} />
                <Route path="/enviarcodigo" element={<EnviarCodigo />} />
                <Route path="/redefinirsenha" element={<RedefinirSenha />} />
                <Route path="/editarPro" element={<EditarPerfil />} />
            </Routes>
        </BrowserRouter>
    );
}
