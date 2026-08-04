import Upload from "@/components/Upload";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2 mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">DevMentor <span className="text-blue-600">AI</span></h1>
          <p className="text-lg text-gray-500">Your intelligent assistant for code and documentation.</p>
        </header>

        <section>
          <Upload />
        </section>

        <section>
          <Chat />
        </section>
      </div>
    </main>
  );
}
