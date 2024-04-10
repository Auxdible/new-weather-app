import { UnitContextProvider } from "./unit";
import { ThemeProvider } from "./theme";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return <UnitContextProvider>
        <ThemeProvider 
            attribute="class"
            defaultTheme="system">
                {children}
        </ThemeProvider>
        </UnitContextProvider>;
}
export default Providers;