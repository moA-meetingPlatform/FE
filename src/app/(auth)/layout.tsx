import { ReactNode } from "react";

const RootLayout = ({ children } : { children: ReactNode }) => {
    return (
        <>
        <header className="text-center mx-auto py-4 bg-white w-full">
            {/* <Heading2>Forgot password</Heading2> */}
            
        </header>
        {children}
        </>
    )
}

export default RootLayout;
