import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";  
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import ChangePassword from "./pages/changePassword";
import injectContext from "./store/appContext";
import ScheduleSelector from "./pages/scheduleSelector";
import CalendarSelector from "./pages/CalendarSelector";
import EditProfile from "./pages/editProfile";
import { NotFound } from "./pages/notFound";

import { ElegirServicio } from "./pages/agenda/elegirServicio";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { WithNavbar } from "./component/withNavbar";
import ProtectedRoute from "./component/protectedRoute";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>       
                        {/* Páginas sin Navbar */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/agenda" element={<ScheduleSelector />} />
                        <Route path="/fecha" element={<CalendarSelector />} />
                        
                        {/* Páginas con Navbar */}
                        <Route element={<WithNavbar />}>
                            

                            <Route element={
                                <ProtectedRoute>
                                    {/* Página de Agenda */}
                                    <EditProfile />
                                </ProtectedRoute>
                            } path="/editar-perfil" />

                            <Route element={
                                <ProtectedRoute>
                                    {/* Página de Home (Edición de perfil) */}
                                    <Home />
                                </ProtectedRoute>
                            } path="/" />

                            {/* Página para cambiar la contraseña */}
                            <Route element={
                                <ProtectedRoute>
                                    {/* Página de cambio de contraseña */}
                                    <ChangePassword />
                                </ProtectedRoute>
                            } path="/change-password" />

                            <Route element={
                                <ProtectedRoute>
                                    {/* Página de Agenda */}
                                    <ElegirServicio />
                                </ProtectedRoute>
                            } path="/elegir-servicio" />

                            
                        </Route>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
