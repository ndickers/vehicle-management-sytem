export default function DashHeader({ title }) {
  return (
    <div className="w-[100%]">
      <div className="flex bg-black p-6 rounded-[1.5rem] justify-between items-center">
        <h2>{title}</h2>
        <div className="flex items-center gap-4">
          <p>username</p>
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
