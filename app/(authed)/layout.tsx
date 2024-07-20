import { AI } from "../actions";
import Header from "@/components/layout/header";
import Transition from "@/components/Transition";
import { RouteChangeHandler } from "@/components/RouteChangeHandler";
export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <Transition>
            <Header />
            <RouteChangeHandler />
            <div className="flex h-screen overflow-hidden">
                <main className="flex-1 overflow-hidden">
                    <AI>{children}</AI>
                </main>
            </div>
        </Transition>
    );
}
