import { createContext } from "react";

type UnitContextType = {
    metric: boolean;
    setMetric?: (metric: boolean) => void;
}
export const UnitContext = createContext<UnitContextType>({
    metric: false,
})