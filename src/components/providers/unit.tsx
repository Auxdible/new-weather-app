"use client";

import { UnitContext } from "@/app/context/UnitContext";
import { useState } from "react";

export function UnitContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [metric, setMetric] = useState<boolean>(false);
    return (
        <UnitContext.Provider value={{ metric, setMetric }}>
            {children}
        </UnitContext.Provider>
    );
}