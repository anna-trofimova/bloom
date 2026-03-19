export default function Cancel() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Payment canceled</h1>
      <p className="mt-2">No charge was made.</p>
      <a href="/" className="inline-block mt-6 px-6 py-2 text-sm font-medium border border-black rounded hover:bg-black hover:text-white transition-colors">
        Go Home
      </a>
    </div>
  );
}