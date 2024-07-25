export default function NavbarRoom({ title, setSearch }) {
  return (
    <div className="bg-[#FFFFFF] p-5 pl-16 pr-16 border-b-[1px] border-[#E4E6ED]  flex justify-between">
      <h1 className="font-body text-xl font-semibold flex flex-col justify-center ">
        {title}
      </h1>
      <div className="relative   flex gap-6">
        <img src="/img/search.svg" className="absolute left-2 top-3"></img>
        <input
          className="border-[1px] border-[#D6D9E4] rounded-sm placeholder:font-body placeholder:text-[#9AA1B9] 
    placeholder:text-[16px] placeholder:font-normal tracking-tighter p-2 pl-10  w-80 "
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button className="bg-[#C14817] text-white h-12 w-48 rounded font-semibold hover:bg-[#dc6536] hover:transition duration-150">
          + Create Room
        </button>
      </div>
    </div>
  );
}
