import Header from "../components/Header";
import MainContent from "../components/MainContent";

export default function Dashboard() {
  return (
    <>
      <Header />

      <main className="pt-20">
        <MainContent />
      </main>
    </>
  );
}