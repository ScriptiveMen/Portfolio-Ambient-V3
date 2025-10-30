import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AllPages from "../pages/AllPages";
const NotFound = lazy(() => import("../components/NotFound"));

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AllPages />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default MainRoutes;
