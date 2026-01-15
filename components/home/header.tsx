import { AuthButtons } from "@/app/(public)/_home/AuthButtons";

export default function Headercomponent() {

    return (
        <header className="bg-gray-200 py-2  shadow-2xl">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-center">TypeOn</h1>
                <AuthButtons />

            </div>
        </header>
    )
}
