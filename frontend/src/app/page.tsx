import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full text-center">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
            Welcome to BhashaSarthi
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your AI-powered partner for effortless translations, breaking down language barriers with precision and speed.
          </p>
          <p className="text-md text-gray-600 mb-8">
            Whether you’re a student, a business professional, or a traveler, BhashaSarthi is designed to assist you in translating content into multiple languages accurately and efficiently.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-semibold"
          >
            Start Translating
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
